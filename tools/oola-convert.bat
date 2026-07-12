@echo off
rem ============================================================
rem  oola-convert.bat  -  Oola Garage training video preparer
rem
rem  TWO MODES
rem   CUT:  drag ONE video onto this file.
rem         It asks start time, end time, and a clip name,
rem         then makes a small phone-ready H.264 720p MP4.
rem   JOIN: drag SEVERAL clips onto this file together.
rem         They are joined into one video, in ALPHABETICAL
rem         ORDER of filename - so name your parts 1_xx, 2_xx, 3_xx.
rem
rem  SETUP (once): put ffmpeg.exe in the SAME folder as this .bat
rem   Get it from www.gyan.dev/ffmpeg/builds ("essentials" zip,
rem   the ffmpeg.exe file inside its "bin" folder).
rem
rem  NAMING RULE for the Training folder:  tool_fault_date.mp4
rem  Avoid apostrophes ( ' ) in file names.
rem ============================================================

if "%~1"=="" (
  echo.
  echo   Drag ONE video here to cut a clip from it.
  echo   Drag SEVERAL clips here together to join them into one.
  echo.
  pause
  exit /b
)

set "FF=ffmpeg"
if exist "%~dp0ffmpeg.exe" set "FF=%~dp0ffmpeg.exe"
if not exist "%~dp0ffmpeg.exe" (
  where ffmpeg >nul 2>nul
  if errorlevel 1 (
    echo.
    echo   ffmpeg was not found. Easiest fix:
    echo   1. Download from  www.gyan.dev/ffmpeg/builds  ^(the "essentials" zip^)
    echo   2. Open the zip, go into its "bin" folder
    echo   3. Copy the single file  ffmpeg.exe  next to this .bat
    echo   4. Run this again. No installing needed.
    echo.
    pause
    exit /b
  )
)

if not "%~2"=="" goto :join

rem ── CUT MODE ────────────────────────────────────────────────
echo.
echo   Cutting from: %~nx1
echo   Leave times blank to convert the whole video.
echo.
set /p TSTART="  Start time  (e.g. 0:45   blank = beginning): "
set /p TEND="  End time    (e.g. 2:30   blank = end):       "
set /p CLIPNAME="  Clip name   (e.g. 1_switch-off   blank = auto): "

set "TRIM="
if not "%TSTART%"=="" set "TRIM=-ss %TSTART%"
if not "%TEND%"=="" set "TRIM=%TRIM% -to %TEND%"

if "%CLIPNAME%"=="" (
  set "OUT=%~dpn1_clip%RANDOM%.mp4"
) else (
  set "OUT=%~dp1%CLIPNAME%.mp4"
)

echo.
"%FF%" -y -i "%~1" %TRIM% -vf "scale=-2:720" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 64k -ac 1 -movflags +faststart "%OUT%"

echo.
echo   ------------------------------------------------------------
echo   Done:  %OUT%
echo   To cut another piece from the same video, drag it here again.
echo   ------------------------------------------------------------
echo.
pause
exit /b

rem ── JOIN MODE ───────────────────────────────────────────────
:join
set "NAMES=%TEMP%\oola_names.txt"
set "LIST=%TEMP%\oola_list.txt"
del "%NAMES%" "%LIST%" 2>nul
for %%F in (%*) do echo %%~fF>>"%NAMES%"
sort "%NAMES%" /o "%NAMES%"

echo.
echo   Joining in this order:
for /f "usebackq delims=" %%F in ("%NAMES%") do (
  echo     %%~nxF
  echo file '%%F'>>"%LIST%"
)
echo.
set /p JOINNAME="  Name for the joined video (blank = joined): "
if "%JOINNAME%"=="" set "JOINNAME=joined"
set "OUT=%~dp1%JOINNAME%_toolfix.mp4"

"%FF%" -y -f concat -safe 0 -i "%LIST%" -c copy "%OUT%"

if errorlevel 1 (
  echo.
  echo   Join failed. This happens when the clips have different formats.
  echo   Fix: drag each clip onto this .bat ALONE first ^(blank times =
  echo   convert whole clip^), then join the converted copies.
  echo.
  pause
  exit /b
)

echo.
echo   ------------------------------------------------------------
echo   Done:  %OUT%
echo   ------------------------------------------------------------
echo.
pause

@echo off
rem ============================================================
rem  oola-convert.bat  -  Oola Garage training video preparer
rem
rem  WHAT IT DOES
rem    Drag any video file onto this .bat. It asks for optional
rem    start/end times, then produces a small H.264 720p MP4
rem    that plays in ToolFix on any phone, online or offline.
rem
rem  ONE-TIME SETUP (needs internet once)
rem    Open Command Prompt and run:   winget install ffmpeg
rem
rem  NAMING RULE for the Training folder
rem    tool_fault_date.mp4
rem    e.g.  grinder_disc-change_2026-07.mp4
rem          drill_reverse-switch_kennedy_2026-07.mp4
rem ============================================================

if "%~1"=="" (
  echo.
  echo   Drag a video file onto this .bat to convert it.
  echo   You will be asked for optional start/end times to cut a clip.
  echo.
  pause
  exit /b
)

set "FF=ffmpeg"
if exist "%~dp0ffmpeg.exe" set "FF=%~dp0ffmpeg.exe"
where %FF% >nul 2>nul
if errorlevel 1 if not exist "%~dp0ffmpeg.exe" (
  echo.
  echo   ffmpeg was not found. Easiest fix:
  echo   1. On the laptop, download ffmpeg from  www.gyan.dev/ffmpeg/builds
  echo      ^(the "essentials" zip^)
  echo   2. Open the zip, go into the "bin" folder inside it
  echo   3. Copy the single file  ffmpeg.exe  into the SAME folder as this .bat
  echo   4. Run this again. No installing needed.
  echo.
  pause
  exit /b
)

set "IN=%~1"
set "OUT=%~dpn1_toolfix.mp4"

echo.
echo   Converting: %~nx1
echo   Leave both blank to keep the whole video.
echo.
set /p TSTART="  Start time  (e.g. 0:45   blank = beginning): "
set /p TEND="  End time    (e.g. 2:30   blank = end):       "

set "TRIM="
if not "%TSTART%"=="" set "TRIM=-ss %TSTART%"
if not "%TEND%"=="" set "TRIM=%TRIM% -to %TEND%"

echo.
"%FF%" -y -i "%IN%" %TRIM% -vf "scale=-2:720" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 64k -ac 1 -movflags +faststart "%OUT%"

echo.
echo   ------------------------------------------------------------
echo   Done:  %OUT%
echo   Rename it for the Training folder:  tool_fault_date.mp4
echo   ------------------------------------------------------------
echo.
pause

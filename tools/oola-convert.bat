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

where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo.
  echo   ffmpeg is not installed. Install it once with:
  echo       winget install ffmpeg
  echo   then run this again.
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
ffmpeg -y -i "%IN%" %TRIM% -vf "scale=-2:720" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 64k -ac 1 -movflags +faststart "%OUT%"

echo.
echo   ------------------------------------------------------------
echo   Done:  %OUT%
echo   Rename it for the Training folder:  tool_fault_date.mp4
echo   ------------------------------------------------------------
echo.
pause

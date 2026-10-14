@echo off
setlocal
cd /d "%~dp0"
if exist .venv\Scripts\python.exe goto install
where py >nul 2>nul
if errorlevel 1 (python -m venv .venv) else (py -3 -m venv .venv)
if errorlevel 1 goto failed
:install
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 goto failed
echo.
echo AETHER will open on a free port, starting at http://127.0.0.1:8010
.venv\Scripts\python.exe launch.py
if errorlevel 1 goto failed
goto end
:failed
echo Could not start AETHER. Check Python 3.11+ and internet access, then try again.
pause
:end
endlocal

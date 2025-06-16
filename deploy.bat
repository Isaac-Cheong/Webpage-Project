@echo off
echo Starting deployment process...

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/download/win
    exit /b 1
)

REM Initialize Git repository if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Add all files to staging
echo Adding files to staging...
git add .

REM Get the current date and time for the commit message
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,8% %datetime:~8,2%:%datetime:~10,2%:%datetime:~12,2%

REM Commit changes
echo Committing changes...
git commit -m "Update: %timestamp%"

REM Check if remote exists
git remote | findstr "origin" >nul
if %ERRORLEVEL% neq 0 (
    echo Please enter your GitHub repository URL (e.g., https://github.com/username/repo.git):
    set /p repoUrl=
    git remote add origin %repoUrl%
)

REM Push changes
echo Pushing changes to GitHub...
git push -u origin main

echo Deployment completed successfully!
pause 
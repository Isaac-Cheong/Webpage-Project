# PowerShell script for Git deployment

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Please install Git from https://git-scm.com/download/win"
    exit 1
}

# Initialize Git repository if not already initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..."
    git init
}

# Add all files to staging
Write-Host "Adding files to staging..."
git add .

# Get the current date and time for the commit message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Commit changes
Write-Host "Committing changes..."
git commit -m "Update: $timestamp"

# Check if remote exists
$remoteExists = git remote | Select-String -Pattern "origin" -Quiet

if (-not $remoteExists) {
    Write-Host "Please enter your GitHub repository URL (e.g., https://github.com/username/repo.git):"
    $repoUrl = Read-Host
    git remote add origin $repoUrl
}

# Push changes
Write-Host "Pushing changes to GitHub..."
git push -u origin main

Write-Host "Deployment completed successfully!" 
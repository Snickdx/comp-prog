@echo off
echo Building MkDocs site...
mkdocs build

echo Deploying to Firebase Hosting...
firebase deploy --only hosting

echo Deployment complete!
pause

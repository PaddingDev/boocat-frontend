@echo off
.\regular.bat
cd dist
git add .
git commit -m "sync"
PAUSE
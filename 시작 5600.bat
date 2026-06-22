@echo off
chcp 65001
cd /d "%~dp0"
start http://localhost:5600
cd /d "landing" && node server.js

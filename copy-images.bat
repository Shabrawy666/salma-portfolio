@echo off
rem Copies image.jpeg, image1.jpeg ... image18.jpeg from your Downloads\writer folder into the website assets folder.
copy /Y "C:\Users\Lenovo\Downloads\writer\image*.jpeg" "%~dp0assets\"
echo.
echo Done. Now open index.html
pause

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const url = "rtsp://admin:Root1234@10.0.0.4:554/cam/realmonitor?channel=1&subtype=0"
//const url = "rtsp://admin:root1234@10.0.0.47:554/cam/realmonitor?channel=1&subtype=0"

const app2 = express();
const port = 3000;

// Rota para transmitir vídeo
app2.get('/video', (req, res) => {
  // Configurações de streaming de vídeo (ajuste conforme necessário)
    res.setHeader('Content-Type', 'video/webm');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Use ffmpeg para transmitir um vídeo (substitua 'input.mp4' pelo seu vídeo)
    ffmpeg()
      .input(url)
      .videoCodec('libvpx')
      .audioCodec('libvorbis')
      .format('webm')
      .pipe(res, { end: true });

});

// Inicie o servidor
app2.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  ipcMain.handle('exit',()=>{
    app.quit();
  })

  ipcMain.handle('minimize',()=>{
    mainWindow.minimize();
  })

  ipcMain.handle('maximize',()=>{
    mainWindow.maximize();
  })

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

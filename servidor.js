const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const url = "rtsp://admin:Root1234@10.0.0.4:554/cam/realmonitor?channel=1&subtype=0"
const app = express();
const port = 3000;

// Rota para transmitir vídeo
app.get('/video', (req, res) => {
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
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
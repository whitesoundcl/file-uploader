require('dotenv').config()
const http = require("http");
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path')

const UploadRouter = require('../routes/uploadRouter')

// Inicializacion de variables
process.env.ENVIROMENT = process.env.ENVIROMENT || 'LOCALHOST';
process.env.HTTP_PORT = process.env.HTTP_PORT || 3002;
process.env.SAVEDIR = process.env.SAVEDIR || './.uploads/';

// Genera la carpeta de subida indicada si no existe.
(fs => !fs.existsSync(process.env.SAVEDIR) && fs.mkdirSync(process.env.SAVEDIR))(require('fs'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.ENVIROMENT === 'LOCALHOST') {
  app.use(cors())
  app.options('*', cors())
}

app.use('/upload', UploadRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
})

// En caso de error
app.use((err, req, res, next) => {
  console.error(err)
  res.sendStatus(500);
});

http.createServer(app).listen(process.env.HTTP_PORT).on("error", console.error);

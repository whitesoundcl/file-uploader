const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.SAVEDIR);
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' UP')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});


const upload = multer({ storage: storage });

router.post('/', upload.single('file'), handleUploadFile);

async function handleUploadFile(req, res) {
  if(req.file) {
    res.redirect('/');
  } else {
    res.status(400).send('No se ha recibido un archivo.')
  }
}

module.exports = router;
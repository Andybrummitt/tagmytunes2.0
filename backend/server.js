const express = require("express");
const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const newDestination = `uploads/${req.params.uuid}`;
        let stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created');
        }       
      cb(null, newDestination)
    },
    fileFilter: function (req, file, cb) {
        if(file.mimetype == "audio/mpeg"){
            cb(null, true)
        }
    }
  })

const upload = multer({ storage: storage })

const port = 5000;

const app = express();

app.use(express.json());


app.post("/upload/:uuid", upload.array("files", 100), (req, res) => {
    const directoryId = req.params.uuid;
    const files = req.files;
  for(file of req.files){
    console.log(file.originalname)
  };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

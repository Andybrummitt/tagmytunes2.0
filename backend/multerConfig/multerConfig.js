const multer = require("multer");
const fs = require("fs");

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
      throw new Error("Directory cannot be created");
    }
    cb(null, newDestination);
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "audio/mpeg") {
      cb(null, true);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage: storage });

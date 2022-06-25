const express = require("express");
const multer = require("multer");
const fs = require("fs");
const NodeID3 = require("node-id3");
const AdmZip = require("adm-zip");

const getTags = require("./functions/getTags");
const apiErrorHandler = require("./error/apiErrorHandler");
const {
  parseStringCommonSuffixes,
  parseStringCustomStrings,
  parseY2mateString,
} = require("./functions/parseStringFromUserOptions");

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

const upload = multer({ storage: storage });

const port = 5000;

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.post("/upload/:uuid", upload.array("files", 100), async (req, res) => {
  if (!req.files) {
    next(ApiError.badRequest("Please include file(s)."));
    return;
  }
  try {
    //  CREATE NEW ZIP FOLDER & PATH
    const zip = new AdmZip();
    const zipPath = `zipfiles/${req.params.uuid}.zip`;
    let filePath;

    //  LOOP OVER FILES
    for (let file of req.files) {
      let fileName = file.originalname;

      //  IF REMOVE-CUSTOM-STRINGS - PARSE STRING
      if (req.body["custom-strings"]) {
        let customStringsArr = req.body["custom-strings"].split(",");
        // RENAME FILE & CHANGE FILE PATH
        fileName = parseStringCustomStrings(fileName, customStringsArr);
      }
      //  IF REMOVE-COMMON-SUFFIXES CHECKBOX IS CHECKED - PARSE STRING
      if (req.body["remove-common-suffixes"]) {
        // RENAME FILE & CHANGE FILE PATH
        fileName = parseStringCommonSuffixes(fileName);
      }
      if (req.body["remove-y2mate-string"]) {
        // RENAME FILE & CHANGE FILE PATH
        fileName = parseY2mateString(fileName);
      }
      filePath = `uploads/${req.params.uuid}/${fileName}`;
      fs.renameSync(file.path, filePath);
      //  WRITE NEW ID3 TAGS
      const tags = getTags(fileName);
      const success = NodeID3.write(tags, filePath);
      zip.addLocalFile(filePath);
    }
    zip.writeZip(zipPath, zip.toBuffer());
    // const stream = fs.createReadStream(`${zipPath}`);

    // res.setHeader('Content-Type', 'application/zip');
    // res.setHeader('Content-Disposition', `inline; filename=${zipPath}`);
    // stream.pipe(res);

    //  SEND ZIP FILE IN RESPONSE
    res.download(zipPath, (err) => {
      if (err) throw new Error("Something went wrong");
      //  DELETE FILES FROM SERVER
      fs.rm(`uploads/${req.params.uuid}`, { recursive: true, force: true }, (err) => {
        if(err) console.log(err)
      });
      fs.unlink(zipPath, (err) => {
        if(err) console.log(err)
      });
    });
  } catch (err) {
    next(ApiError.badRequest("Sorry, something went wrong."));
  }
});

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

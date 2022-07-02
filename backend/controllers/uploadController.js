const {
  parseStringCommonSuffixes,
  parseStringCustomStrings,
  parseY2mateString,
} = require("../functions/parseStringFromUserOptions");
const getTags = require("../functions/getTags");
const NodeID3 = require("node-id3");
const AdmZip = require("adm-zip");
const fs = require("fs");
const ApiError = require("../error/apiError");
const path = require('path');

exports.uploadController = async function (req, res, next) {
  if (req.files.length < 1) {
    next(ApiError.badRequest("No files selected"));
    return;
  }

  //  CREATE NEW ZIP FOLDER & PATH
  const zip = new AdmZip();
  const zipPath = path.join(__dirname, `zipfiles/${req.params.uuid}.zip`);
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
    NodeID3.write(tags, filePath);
    zip.addLocalFile(filePath);
  }
  zip.writeZip(zipPath, zip.toBuffer());
  //  SEND ZIP FILE IN RESPONSE
  res.download(zipPath, (err) => {
    if (err) throw new Error("Something went wrong");
    //  DELETE FILES FROM SERVER
    fs.rm(
      (path.join(__dirname, `uploads/${req.params.uuid}`)),
      { recursive: true, force: true },
      (err) => {
        if (err) console.log(err);
      }
    );
    fs.unlink(zipPath, (err) => {
      if (err) console.log(err);
    });
  });
};

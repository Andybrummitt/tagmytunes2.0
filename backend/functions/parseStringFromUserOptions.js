const standardRegex =
  /([\[(]Official Music Video[\])]|[\[(]Music Video[\])]|[\[(]Lyric Video[\])]|[\[(]Lyrics[\])]|[\[(]With Lyrics[\])]|[\[(]Audio[\])]|[\[(]Official Audio[\])]|[\[(]hd[\])]|[\[(]hq[\])])/gim;

const parseStringCommonSuffixes = (string) => {
  return string.replaceAll(standardRegex, "");
};

const parseStringCustomStrings = (fileName, strings) => {
  let parsedFileName;
  for (let string of strings) {
    parsedFileName = fileName.replace(string, "");
  }
  return parsedFileName;
};

const parseY2mateString = (fileName) => {
  //  CHECK STRING HAS AT LEAST 3 DASHES (IS Y2MATE COMPATIBLE)
  let warningDashCounter = 0;
  for (let char of fileName) {
    if (char === "-") warningDashCounter++;
  }
  if (warningDashCounter <= 3) return fileName;
  //  PARSE FOR Y2MATE CODE
  let dashCounter = 0;
  let parsedString = fileName;
  for (let i = fileName.length; i >= 0; i--) {
    let char = fileName[i];
    if (char === "-") {
      dashCounter++;
      if (dashCounter === 3) {
        parsedString = parsedString.substring(0, i).concat(".mp3");
        break;
      }
    }
  }
  return parsedString;
};

module.exports = {
  parseStringCommonSuffixes,
  parseStringCustomStrings,
  parseY2mateString,
};

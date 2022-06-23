// const parseStringFromUserOptions = (file, optionsState, standardRegex) => {
//     console.log('yo')
//     const y2MateRegex = /(y2Mate\.is - )/gmi;
//     let parsedFileString = file;
//     const { customStringsToRemove, removeCommonSuffixes } = optionsState;
//     // if(removeCommonSuffixes){
//         // alert('mug')
//         parsedFileString = parsedFileString.replaceAll(standardRegex, '');
//         parsedFileString = parsedFileString.replaceAll(y2MateRegex, '');
//         console.log(parsedFileString)
//         let newStr;
//         let startingIndex;
//         let counter = 0;
//         for(let i = parsedFileString.length; i > 0; i--){
//             if(parsedFileString[i] === '-'){
//                 counter ++;
//             }
//             if(counter === 3){
//                 newStr = parsedFileString.substring(i, parsedFileString.length-1);
//                     if(newStr.includes('160k')){
//                         startingIndex = i;
//                         break;
//                     }
//               }
//         }
        
        
//         parsedFileString = parsedFileString.substring(0, startingIndex)

//     //   }
//     if(customStringsToRemove.length > 0){
//         for(let customString of customStringsToRemove){
//             parsedFileString = parsedFileString.replaceAll(customString.name, '')
//         }
//     }
//     return parsedFileString;
// }

const standardRegex = /([\[(]Official Music Video[\])]|[\[(]Music Video[\])]|[\[(]Lyric Video[\])]|[\[(]Lyrics[\])]|[\[(]With Lyrics[\])]|[\[(]Audio[\])]|[\[(]Official Audio[\])]|[\[(]hd[\])]|[\[(]hq[\])])/gmi;

const parseStringCommonSuffixes = (string) => {
    return string.replaceAll(standardRegex, '');
}

const parseStringCustomStrings = (fileName, strings) => {
    let parsedFileName;
    for(let string of strings){
        parsedFileName = fileName.replace(string, "")
    }
    return parsedFileName;
}

const parseY2mateString = (fileName) => {
    //  CHECK STRING HAS AT LEAST 3 DASHES (IS Y2MATE COMPATIBLE)
    let warningDashCounter = 0;
    for(let char of fileName){
        if(char === '-') warningDashCounter++;
    }
    if(warningDashCounter <= 3) return;
    //  PARSE FOR Y2MATE CODE
    let dashCounter = 0;
    let parsedString = fileName;
    for(let i = fileName.length; i >= 0; i--){
      let char = fileName[i]
      if(char === '-'){
        dashCounter++;
        if(dashCounter === 3){
        	parsedString = parsedString.substring(0, i).concat('.mp3');
            break;
        }
      }    
    }
    return parsedString;
}


module.exports = { parseStringCommonSuffixes, parseStringCustomStrings, parseY2mateString };
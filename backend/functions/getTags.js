const getTags = fileString => {
          let counter = 0;
          let dashIndex = 0;
          let artistName = '';
          let rest = '';
          for (let char of fileString) {
            counter++;
            if (char === '-' && fileString.charAt(counter-2) === ' ' && fileString.charAt(counter+2 === ' ')){
              dashIndex = counter;
              artistName = fileString.substring(0, dashIndex - 2)
              rest = fileString.substring(dashIndex + 1, fileString.length)
              break
            } 
          };
          rest = rest.replace('.mp3', '');
          const tags = {
            title: rest || fileString,
            artist: artistName || '',
          }
          return tags;
      }
  
  module.exports = getTags
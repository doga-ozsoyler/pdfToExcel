const Tesseract = require("tesseract.js");
const fs = require("fs");
const { test } = require("./test");

// /output/files/

function convertWithNodeTess(bool, overallPicCount) {
  if (bool) {
    let pdfDirectory = __dirname + "/output";
    const files = fs.readdirSync(pdfDirectory);

    var arrayOfFiles = [];
    files.forEach((file) => {
      arrayOfFiles.push(pdfDirectory + "/" + file);
    });

    var countTotalProgress = 0;

    for (k = 0; k < arrayOfFiles.length; k++) {
      var arrayOfPngs = [];
      const pngs = fs.readdirSync(arrayOfFiles[k]);
      pngs.forEach((png) => {
        arrayOfPngs.push(png);
      });

      for (z = 0; z < arrayOfPngs.length; z++) {
        console.log(`${arrayOfFiles[k]}/${arrayOfPngs[z]}`,)
        // console.log(arrayOfPngs[z])
        Tesseract.recognize(
          `${arrayOfFiles[k]}/${arrayOfPngs[z]}`,
          // "output/ARCHED CB CALIFORNIA-FEB2-1.pdf/ARCHED CB CALIFORNIA-FEB2-1.pdf_1.png",
          "eng",
          // { logger: (m) => (console.log(m.progress)) }
          {
            logger: (m) => {
              if (m.progress === 1) {
                console.log("Reading progress done.");
                //increment here
                countTotalProgress++;
              }
            },
          }
        )

          .then(({ data: { text } }) => {
            // console.log(text);
            fs.appendFile("./DATA_IN_TEXT.txt", text, function (err) {
              if (err) throw err;
              // console.log("IS WRITTEN");
            });

            if (countTotalProgress === overallPicCount * 5) {
              console.log(overallPicCount);
              test();
            } else {
              setTimeout(() => {
                console.log("Waiting overallPicCount progress...");
              }, 10000);
            }
          })
          .then((overallPicCount) => {
            console.log("HERE HERE, LISTEN TO ME PLEBS!: "+overallPicCount)
          });      

        // console.log("THIS IS THE OVERALL NUM: " + overallPicCount)≠
      }
    }
    // return true;
  } 
  // else {
  //   setTimeout(() => {
  //     console.log("Waiting PDF to PNG bool.");
  //   }, 10000);
  // }
}

exports.convertWithNodeTess = convertWithNodeTess;

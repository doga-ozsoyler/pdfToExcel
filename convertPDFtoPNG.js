const fs = require("fs");

const path = require("path");
const Pdf2Img = require("node-pdf2img-promises");

const { convertWithNodeTess } = require("./convertWithNodeTess");

convertPDFtoPNGFunc(false);

function convertPDFtoPNGFunc(boolConvertedAll) {
  let pdfDirectory = __dirname + "/files";

  const files = fs.readdirSync(pdfDirectory);

  // check if output folder exists
  const foName = "./output";
  checkFolder(foName);

  // // check if DATA_IN_TEXT exists
  // const fiName = `${foName}/DATA_IN_TEXT.txt`;
  // console.log({foName, fiName})
  // checkFile(fiName);

  var arrayOfFile = [];
  var arrayOfPDFImages = [];
  files.forEach((file) => {
    arrayOfFile.push(__dirname + "/files/" + file);
  });

  for (let i = 0; i < arrayOfFile.length; i++) {
    let converter = new Pdf2Img();

    // The event emitter is emitting to the file name
    // converter.on(fileName, (msg) => {
    //     console.log('Received: ', msg);
    // });

    converter.setOptions({
      type: "png", // png or jpg, default jpg
      size: 3000, // default 1024
      density: 600, // default 600
      quality: 500, // default 100
      outputdir: __dirname + path.sep + "output/" + files[i], // output folder, default null (if null given, then it will create folder name same as file name)
      outputname: files[i], // output file name, dafault null (if null given, then it will create image name same as input name)
    });

    converter
      .convert(arrayOfFile[i])
      .then((info) => {
        if (info.result === "success") {
          var arrayOfPDFImagesLocal = [];
          for (var k = 0; k < info.message.length; k++) {
            arrayOfPDFImages.push(info.message[i].path);
            arrayOfPDFImagesLocal.push(info.message[i].path);

            if (
              arrayOfPDFImagesLocal.length === info.message.length &&
              // info.message[arrayOfFile.length].page
              info.result === "success" &&
              arrayOfFile[i + 1] === undefined
            ) {
              // console.log("INFO INSIDE IF: " + info.result)
              // console.log("LAST FILE IS DONE")
              boolConvertedAll = true;
              console.log("PDF to PNG conversion Done!");
              convertWithNodeTess(boolConvertedAll, arrayOfPDFImages.length);
              return boolConvertedAll;
            } else {
              setTimeout(() => {
                console.log("Waiting PDF to PNG conversion...");
              }, 10000);
            }
          }
          // console.log(info)
          // console.log('DONE with document number: ' + k);
        }
        // return boolConvertedAll;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function checkFolder(foName) {
  if (!fs.existsSync(foName)) {
    fs.mkdirSync(foName);
  }
}

// function checkFile(foName) {
//   if (!fs.existsSync(foName)) {
//     fs.writeFileSync('/fiName.txt');
//   }
// }

exports.convertPDFtoPNGFunc = convertPDFtoPNGFunc;

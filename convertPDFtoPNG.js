const fs = require("fs");

module.exports = async function convertPDFtoPNG() {
  try {
    const path = require("path");
    const Pdf2Img = require("node-pdf2img-promises");

    let pdfDirectory = __dirname + "/files";

    const files = fs.readdirSync(pdfDirectory);

    var arrayOfFile = [];
    files.forEach((file) => {
      arrayOfFile.push(__dirname + "/files/" + file);
    });

    





// const path = './file.txt'

// try {
//   if (fs.existsSync(path)) {
//     //file exists
//   }
// } catch(err) {
//   console.error(err)
// }












    for (let i = 0; i < arrayOfFile.length; i++) {
      let converter = new Pdf2Img();

      // The event emitter is emitting to the file name
      // converter.on(fileName, (msg) => {
      //     console.log('Received: ', msg);
      // });

      converter.setOptions({
        type: "png", // png or jpg, default jpg
        size: 1024, // default 1024
        density: 600, // default 600
        quality: 100, // default 100
        outputdir: __dirname + path.sep + "output/" + files[i], // output folder, default null (if null given, then it will create folder name same as file name)
        outputname: files[i], // output file name, dafault null (if null given, then it will create image name same as input name)
      });

      await converter
        .convert(arrayOfFile[i])
        .then((info) => {
          console.log(info);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return await arrayOfFile;
  } catch (err) {
    console.log(err);
  }
};

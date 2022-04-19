const fs = require("fs");
const pdf = require("pdf-parse");
const xlsx = require("xlsx");
const excelFilee = "./test.xlsx";
const excelFile = "./EMBROIDERY AUTOMATION FILE - Do not edit.xlsx";

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

for (var i = 0; i < arrayOfFile.length; i++) {
  let dataBuffer = fs.readFileSync(arrayOfFile[i]);
  console.log(arrayOfFile[i]);

  pdf(dataBuffer)
    .then(function (data) {
      // // number of pages
      console.log(data.numpages);
      // // number of rendered pages
      // console.log(data.numrender);
      // // PDF info
      // console.log(data.info);
      // // PDF metadata
      // console.log(data.metadata);
      // // PDF.js version
      // // check https://mozilla.github.io/pdf.js/getting_started/
      // console.log(data.version);

      // PDF text
      var str = data.text;
      //   console.log(str);
    })
    .then(function () {})
    .then(function () {});
}

//check folder function
function checkFolder(foName) {
  if (!fs.existsSync(foName)) {
    fs.mkdirSync(foName);
  }
}

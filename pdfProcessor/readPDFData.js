const fs = require("fs");
const pdf = require("pdf-parse");
const xlsx = require("xlsx");
const excelFilee = "./test.xlsx";
// const excelFile = "./EMBROIDERY AUTOMATION FILE - Do not edit.xlsx";
const excelFile = "./ARCHED CB CALIFORNIA-FEB2-1.pdf";
acrobat = require("acrobat");
PDFParser = require("pdf2json");

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
  //   console.log(arrayOfFile[i]);

  let options = {
    max: 1,
  };

  pdf(dataBuffer, options)
    .then(function (data) {
      // // number of pages
      //   console.log(data.numpages);
      // // number of rendered pages
      // console.log(data.numrender);
      // // PDF info
      // console.log(data.info);
      // // PDF metadata
      //   console.log(data.metadata);
      // // PDF.js version
      // // check https://mozilla.github.io/pdf.js/getting_started/
      // console.log(data.version);
      //   console.log(data);
      // PDF text
      var str = data.text;
      console.log(str);
    })
    .then(function () {
      //   console.log(str);
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData) =>
        console.error(errData.parserError)
      );
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
      });

      pdfParser.loadPDF("./files/ARCHED CB CALIFORNIA-FEB2-1.pdf");
    })
    .then(function () {});
}

//check folder function
function checkFolder(foName) {
  if (!fs.existsSync(foName)) {
    fs.mkdirSync(foName);
  }
}

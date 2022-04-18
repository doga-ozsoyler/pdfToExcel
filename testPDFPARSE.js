const fs = require("fs");
const pdf = require("pdf-parse");

const writeXlsxFile = require("write-excel-file/node");

//burada array multidimensional
const matchAll = (r) => (s) => [...s.matchAll(r)];
const orderList = matchAll(
  /Order Id  (\d+ \d+ \d+|\d+)\n\n?.*?SKU  (.*?) .*?\n.*?Sonu/gs
);
let dataBuffer = fs.readFileSync("./TOILETRY BAG.pdf");

var arrayOfPDF = [];
var string;
var spilitted;
var keys = ["Name", "Title", "Font"];

pdf(dataBuffer)
  .then(function (data) {
    // // number of pages
    // console.log(data.numpages);
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

    // string = str.replace(/[^a-zA-Z0-9\n]|\\n/g, " ");
    string = str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\n]|\\n\|\\/g, " ");
    // console.log(string);
    arrayOfPDF = string.split("\n");
    // console.log(arrayOfPDF);
  })
  .then(function () {
    // var el = arrayOfPDF.find((a) => a.includes("Date"));
    var el = arrayOfPDF
      .map((a, ind, arr) => (a.includes("Note Sonu") ? arr[ind] : false))
      .filter(Boolean);

    for (var i = 0; i < el.length; i++) {
      var pickedInfo = orderList(string)[i][0];
      // console.log(
      //   "/////////////////////////////////// pickedInfo ///////////////////////////////////"
      // );
      spilitted = pickedInfo.split("\n");
      // console.log(el.length);
      // console.log(spilitted);
    }

    // var el = arrayOfPDF.forEach((element) => element.includes("Colors"));
  })
  .then(function () {
    var object = Object.assign(
      {},
      ...Object.entries({ ...keys }).map(([a, b]) => ({ [b]: pickedInfo }))
    );
    console.log(object);
    // When passing `data` for each cell.
    writeXlsxFile(spilitted, {
      filePath: "/excel/file.xlsx",
    });
  });

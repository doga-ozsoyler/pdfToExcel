const fs = require("fs");
const pdf = require("pdf-parse");
const xlsx = require("xlsx");
const excelFilee = "./test.xlsx";
const excelFile = "./EMBROIDERY AUTOMATION FILE - Do not edit.xlsx";

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
    string = str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\n&\/]/g, " ");
    // console.log(string);
    arrayOfPDF = string.split("\n");
    // console.log(arrayOfPDF);
  })
  .then(function () {
    // var el = arrayOfPDF.find((a) => a.includes("Date"));
    var el = arrayOfPDF
      .map((a, ind, arr) => (a.includes("Note Sonu") ? arr[ind] : false))
      .filter(Boolean);

    // for (var i = 0; i < el.length; i++) {
    //   var pickedInfo = orderList(string)[i][0];
    //   // spilitted = pickedInfo.split("\n");
    //   // console.log(el.length);
    //   for (var j = 0; j < keys.length; i++) {
    //     if (keys[i]) {
    //       if (pickedInfo.includes(keys[i])) {
    //         console.log(keys[i], pickedInfo);
    //       }
    //     } else {
    //       console.log("NOPE");
    //     }
    //   }
    // }

    // var el = arrayOfPDF.forEach((element) => element.includes("Colors"));
  })
  .then(function () {
    try {
      var data = [
        {
          Name: "Nikhil",
          Font: 2,
          Title: "TORCH",
        },
        {
          Name: "Nikhil",
          Font: "Copperleaf",
        },
        {
          Name: "Nikhil",
          Font: 2,
          Title: "TORCH",
        },
        {
          Font: 2,
          Title: "TORCH",
        },
        {
          Name: "Nikhil",
          Font: 2,
          Title: "TEEST",
        },
      ];
      for (var z = 0; z < data.length; z++) {
        if (!data[z].Name) {
          data[z].Name = " ";
        } else if (!data[z].Font) {
          data[z].Font = " ";
        } else if (!data[z].Title) {
          data[z].Title = " ";
        }
      }
      const sheetName = "Sheet1"; // <-- Change to the actual sheet name.
      const workbook = xlsx.readFile(excelFile);
      // workbook.Sheets[sheetName] = xlsx.utils.json_to_sheet(
      //   [[data[0].Name, "", data[0].Font, data[0].Title]],
      //   {
      //     // header: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      //     origin: -1,
      //     skipHeader: true,
      //   }
      // );
      for (var n = 0; n < data.length; n++) {
        // Overwrite worksheet
        xlsx.utils.sheet_add_json(
          workbook.Sheets[sheetName],
          [{ A: data[n].Name, B: data[n].Font, D: data[n].Title }],
          {
            header: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            skipHeader: true,
            origin: n,
          }
        );
      }
      xlsx.writeFile(workbook, excelFile);
    } catch (err) {
      console.log(err);
    }
  });

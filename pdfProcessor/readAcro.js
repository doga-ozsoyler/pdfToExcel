var pdfUtil = require("pdf-to-text");
var pdf_path = "./files/BUTHCER SMALL CB CALIFORNIA-FEB2-1.pdf";
//option to extract text from page 0 to 10
var option = { from: 0, to: 1 };

pdfUtil.pdfToText(pdf_path, option, function (err, data) {
  if (err) throw err;
  console.log(data); //print text
});

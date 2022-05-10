const fs = require("fs");
const flattener = require("pdf-flatten");

const inputBuffer = fs.readFileSync(
  __dirname + "/files/ARCHED CB CALIFORNIA-FEB2-1.pdf",
  (err) => {
    throw new Error(err);
  }
);

// the flatten() method takes a buffer as an input
flattener.flatten(inputBuffer).then((res) => {
  console.log(res); // output is the flattened pdf via a buffer as well
  fs.writeFileSync("outputFile.pdf", res, (err) => {
    throw new Error(err);
  });
});

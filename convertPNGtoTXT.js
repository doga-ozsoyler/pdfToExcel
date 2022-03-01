const convertPDFtoPNG = require("./convertPDFtoPNG.js");

module.exports = convertPNGtoTXT = async () => {
  try {
    const selectImages = await convertPDFtoPNG();
    console.log(selectImages);
    const tesseract = require("node-tesseract-ocr");

    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };

    // const images = ["./test/samples/file1.png", "./test/samples/file2.png"]
    // const images = [
    //   "./output/ARCHED CB CALIFORNIA-FEB2-1.pdf/test_1.png",
    //   "./output/ARCHED CB CALIFORNIA-FEB2-1.pdf/test_2.png",
    // ];
    const images = selectImages;

    tesseract
      .recognize(images, config)
      .then((text) => {
        console.log("Result:", text);
      })
      .catch((error) => {
        console.log(error.message);
      });

    return "Done!";
  } catch (error) {
    console.log(error);
  }
};
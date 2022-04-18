const { convertPDFtoPNGFunc } = require("./convertPDFtoPNG");
const { convertWithNodeTess } = require("./convertWithNodeTess");

const fs = require("fs");

var boolConvertedAll = false;

     startDataProcess();


 async function startDataProcess() {


    
var returnFromFirst =  await convertPDFtoPNGFunc(boolConvertedAll);
// convertPDFtoPNGFunc(boolConvertedAll);


await migrateToXLSX(returnFromFirst)

// convertWithNodeTess(true)
// console.log(returnFromFirst)
// var returnFromSecond =  convertWithNodeTess(returnFromFirst);
// console.log(returnFromSecond)
    //  lastUpdatedDate('./output/DATA_IN_TEXT.txt');
    //  migrateToXLSX(returnFromSecond);

    // convertPDFtoPNGFunc(boolConvertedAll).then(ret1 => {return convertWithNodeTess(ret1)}).catch(err => {console.log("error is: ",err)})

}



function migrateToXLSX(returnFromFirst) {
  console.log("DONE", returnFromFirst)
  return "ME RETURN IS HERE... YARRRG!";
}

// function lastUpdatedDate (file) {
//   const { mtime, ctime } = fs.statSync(file)

//   console.log(`File data   last modified: ${mtime}`)
//   console.log(`File status last modified: ${ctime}`)

//   return mtime
// }

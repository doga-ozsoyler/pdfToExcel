const fs = require('fs');
const readline = require("readline");

test() 
// var a= test() 
// console.log(a)

async function test() {
//   console.log(
//     "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DOBBY IS FREE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
//   );

    //Date, Preparer, Controller 1, Controller 2
  var arrayOfTXTData = [];
  var arrayOfSpecificData = [];

// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('DATA_IN_TEXT.txt')
//   });
  
//   lineReader.on('line', function (line) {
//     arrayOfTXTData.push(line)
//     // console.log('Line from file:', line);
//     // console.log(arrayOfTXTData)
//   });







async function processLineByLine(arrayOfTXTData) {
  const fileStream = fs.createReadStream("DATA_IN_TEXT.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  for await (const line of rl) {
    //   console.log(`Line from file: ${line}`);
    await arrayOfTXTData.push(line);
  }
  return arrayOfTXTData;
}

var arrayOfTXTData = await processLineByLine(arrayOfTXTData);
// console.log(arrayOfTXTData);


var filteredArrayOfTXTData_DATE = arrayOfTXTData.filter(arrayOfTXTData => String(arrayOfTXTData).startsWith('DATE: '));
var filteredArrayOfTXTData_Preparer = arrayOfTXTData.filter(arrayOfTXTData => String(arrayOfTXTData).startsWith('PREPARER: '));
var filteredArrayOfTXTData_Controller1 = arrayOfTXTData.filter(arrayOfTXTData => String(arrayOfTXTData).startsWith('1ST CHECKER: '));
var filteredArrayOfTXTData_Controller2 = arrayOfTXTData.filter(arrayOfTXTData => String(arrayOfTXTData).startsWith('2ND CHECKER: '));

// var filteredArrayOfTXTData_OrderId = arrayOfTXTData.filter(arrayOfTXTData => String(arrayOfTXTData).startsWith('Order # '));

var filteredArrayOfTXTData_OrderId = arrayOfTXTData.filter(function(orderid){
    return orderid.includes("Order ")
  });

console.log(filteredArrayOfTXTData_OrderId)

arrayOfSpecificData.push(...filteredArrayOfTXTData_DATE, ...filteredArrayOfTXTData_Preparer, ...filteredArrayOfTXTData_Controller1, ...filteredArrayOfTXTData_Controller2, ...filteredArrayOfTXTData_OrderId)
// console.log(arrayOfSpecificData)










// console.log(arrayOfTXTData)

//   if(arrayOfTXTData.includes('DATE: ')){
//     arrayOfSpecificData.push(line)
//     console.log(arrayOfSpecificData)
// }


}

exports.test = test;

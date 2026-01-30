import fs from 'fs';

import readline from 'readline'

let errorcount=0;
let infocount=0;
let warningcount=0;

const rl=readline.createInterface({

    input:fs.createReadStream("log.txt"),

});

rl.on("line", (line) => {
  if (line.includes("ERROR")) {
    errorcount++;
  } else if (line.includes("INFO")) {
    infocount++;
  } else if (line.includes("WARNING")) {
    warningcount++;
  }
});

rl.on("close",()=>{
  console.log(" Log Summary Report");
  console.log("---------------------");
  console.log("Errors   :", errorcount);
  console.log("Infos    :", infocount);
  console.log("Warnings :", warningcount);

});
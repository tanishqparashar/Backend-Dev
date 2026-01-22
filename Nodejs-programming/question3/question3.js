const fs = require('fs');

 function update(date, type, data) {
    const log = `${date} | ${type} | ${data}\n`;
    fs.writeFileSync('file.txt', log, {flag:'a'});
}

setInterval(() => {
    update(new Date(), 'error', 'This is opopo');
    console.log('File updated');
}, 5000);
module.exports={update};
const fs=require('fs');
function create1(params) {
    fs.writeFileSync("file2.txt"," I am Tanishq Parashar ");
    return
}

function read1(params) {
    const res=fs.readFileSync("file2.txt","utf-8");
    return res;

}
function update1(params) {
    const res=fs.appendFileSync("file2.txt","pursuing B-tech cse from GLA University ")
    return res;
    
}
function delete1(params) {
    fs.unlinkSync("file2.txt");
}
create1();
console.log(update1());

console.log(read1());
// console.log(delete1());

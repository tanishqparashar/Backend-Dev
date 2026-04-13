const fs = require("fs");
const path = require("path");

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case "read":
    readFile(arg1);
    break;

  case "write":
    writeFile(arg1, arg2);
    break;

  case "copy":
    copyFile(arg1, arg2);
    break;

  case "delete":
    deleteFile(arg1);
    break;

  case "list":
    listDirectory(arg1 || ".");
    break;

  default:
    showHelp();
}

// ===== FUNCTIONS =====

function readFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(" Error reading file:", err.message);
      return;
    }
    console.log(" File Content:\n");
    console.log(data);
  });
}

function writeFile(filePath, content) {
  if (!content) {
    console.log(" Please provide content to write.");
    return;
  }

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(" Error writing file:", err.message);
      return;
    }
    console.log(" File written successfully.");
  });
}

function copyFile(source, destination) {
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error(" Error copying file:", err.message);
      return;
    }
    console.log(" File copied successfully.");
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(" Error deleting file:", err.message);
      return;
    }
    console.log(" File deleted successfully.");
  });
}

function listDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(" Error reading directory:", err.message);
      return;
    }
    console.log(" Directory Contents:");
    files.forEach((file) => console.log(file));
  });
}

function showHelp() {
  console.log(`
 File Manager CLI Usage:

node file-manager.js read <filePath>
node file-manager.js write <filePath> "<content>"
node file-manager.js copy <sourcePath> <destinationPath>
node file-manager.js delete <filePath>
node file-manager.js list <directoryPath>

Examples:
node file-manager.js read test.txt
node file-manager.js write test.txt "Hello World"
node file-manager.js copy a.txt b.txt
node file-manager.js delete test.txt
node file-manager.js list .
`);
}
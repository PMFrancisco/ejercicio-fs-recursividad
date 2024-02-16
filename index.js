const fs = require("fs");
const path = require("path");

const directoryPath = "/Users/franc/OneDrive/Documentos/TheBridge/programacion funcional/ejercicio-fs-recursividad/";
const excludedFile = "README.md";
const excludeReadme = fs.readdirSync(directoryPath);

//1
function getFilesAndFolders(excludedFile) {
  return excludeReadme.filter((file) => file !== excludedFile);
}

const fileList = getFilesAndFolders(directoryPath, excludedFile);
console.info("Files and folders in the directory: ", fileList);

// 1 recursive
function getTotalFilesCount(directoryPath, count = 0) {
  function countFilesRecursively(directoryPath) {
    const contents = fs.readdirSync(directoryPath);

    contents.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        countFilesRecursively(itemPath);
      } else if (item !== excludedFile) {
        count++;
      }
    });
  }

  countFilesRecursively(directoryPath);

  return count;
}

const totalFilesCount = getTotalFilesCount(directoryPath);
console.info("Total number of files in the tree: ", totalFilesCount);

//2

function getTotalFilesAndDirectoriesCount(
  directoryPath,
  excludedFile,
  count = 0,
) {
  function countFilesAndDirectoriesRecursively(directoryPath) {
    const contents = fs.readdirSync(directoryPath);

    contents.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        count++;
        countFilesAndDirectoriesRecursively(itemPath);
      } else if (item !== excludedFile) {
        count++;
      }
    });
  }

  countFilesAndDirectoriesRecursively(directoryPath);

  return count;
}

const totalFilesAndDirectoriesCount = getTotalFilesAndDirectoriesCount(
  directoryPath,
  excludedFile,
);
console.info(
  "Total number of files and directories in the tree: ",
  totalFilesAndDirectoriesCount,
);

// 3 Recursive

function getTotalBytesFromFiles(directoryPath, excludedFile, totalBytes = 0) {
  function countBytesRecursively(directoryPath) {
    const contents = fs.readdirSync(directoryPath);

    contents.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        countBytesRecursively(itemPath);
      } else if (item !== excludedFile) {
        totalBytes += stat.size;
      }
    });
  }

  countBytesRecursively(directoryPath);

  return totalBytes;
}

const totalBytesFromFiles = getTotalBytesFromFiles(directoryPath, excludedFile);
console.info("Total bytes from files in the tree: ", totalBytesFromFiles);

// 4

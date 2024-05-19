const fs = require('fs');
const http = require('http');
const path = require('path');

// Function to recursively get subdirectories
function getSubdirectories(targetPath, currentPath = '') {
    const currentFullPath = path.join(targetPath, currentPath);
    const files = fs.readdirSync(currentFullPath);
    const subdirectories = [];

    files.forEach(file => {
        const fullPath = path.join(currentPath, file);
        const stats = fs.statSync(path.join(currentFullPath, file));

        if (stats.isDirectory() && !file.startsWith('.')) {
            subdirectories.push(fullPath);
            subdirectories.push(...getSubdirectories(targetPath, fullPath));
        }
    });

    return subdirectories;
}

// Function to write subdirectories and files as JSON
function writeSubdirectoriesAndFiles(targetPath, prefix = '') {
    const subdirectories = getSubdirectories(targetPath);
    const data = {};

    subdirectories.forEach(subdirectory => {
        const directoryPath = path.join(targetPath, subdirectory);
        const files = fs.readdirSync(directoryPath).filter(file => !file.startsWith('.'));
        data[subdirectory] = files;
    });

    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(`${prefix}paths.json`, jsonData);
    console.log(`Data written to ${prefix}paths.json`);
}

// Example usage
const targetPath = 'src/assets/img'; // Provide your target path here
const prefix = 'src/assets/'; // Provide your prefix here

writeSubdirectoriesAndFiles(targetPath, prefix);
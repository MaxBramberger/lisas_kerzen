const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFolder = 'dist/assets/img';
const outputFolder = 'tmp';
const targetWidth = 800; // Adjust this according to your needs

function processImagesInFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    // Recursively process subdirectories
                    processImagesInFolder(filePath);
                } else {
                    // Create downscaled copies in output folder
                    const outputPath = path.join(outputFolder, path.relative(inputFolder, folderPath));
                    fs.mkdirSync(outputPath, { recursive: true });
                    sharp(filePath)
                        .resize({ width: targetWidth })
                        .toFile(path.join(outputPath, file), (err, info) => {
                            if (err) {
                                console.error('Error processing image:', err);
                            } else {
                                console.log('Processed:', info);
                                // Optionally, replace original file with downscaled copy
                                // Uncomment the following line to replace original files
                                fs.renameSync(path.join(outputPath, file), filePath);
                            }
                        });
                }
            });
        });
    });
}

function deleteOutputDirectory() {
    fs.rmdir(outputFolder, { recursive: true }, (err) => {
        if (err) {
            console.error('Error deleting output directory:', err);
            return;
        }
        console.log('Output directory deleted successfully');
    });
}

processImagesInFolder(inputFolder);
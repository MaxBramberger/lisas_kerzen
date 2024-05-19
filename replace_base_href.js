#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to replace base href
function replaceBaseHref(filePath) {
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            process.exit(1);
        }

        // Replace <base href="/"> with <base href="/my_ref/">
        const updatedData = data.replace('<base href="/">', '<base href="/lisas_kerzen/">');

        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
                process.exit(1);
            }

            console.log(`Successfully updated base href in ${filePath}`);
        });
    });
}

// Ensure a file path is provided
if (process.argv.length < 3) {
    console.error('Usage: node replace_base_href.js <file-path>');
    process.exit(1);
}

// Get the file path from the command line arguments
const filePath = path.resolve(process.argv[2]);

// Call the function to replace base href
replaceBaseHref(filePath);
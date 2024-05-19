const { exec } = require('child_process');

// Function to execute a command and return a promise
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        const process = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command "${command}": ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`Error output from command "${command}": ${stderr}`);
            }
            console.log(`Output from command "${command}": ${stdout}`);
            resolve();
        });

        process.stdout.pipe(process.stdout);
        process.stderr.pipe(process.stderr);
    });
}

// Main function to run the commands sequentially
async function runCommands() {
    try {
        await executeCommand('node subpaths.js');
        await executeCommand('ng build');
        await executeCommand('node downscale_img.js');
        await executeCommand('node replace_base_href.js docs/index.html');
        console.log('All commands executed successfully.');
    } catch (error) {
        console.error('An error occurred during command execution:', error);
    }
}

runCommands();
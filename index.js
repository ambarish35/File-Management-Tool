const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function listFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
        } else {
            console.log(`Files in ${directory}:`);
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}

function readFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
        } else {
            console.log(`Content of ${filePath}:`);
            console.log(data);
        }
    });
}

function createFile(filePath, content) {
    fs.writeFile(filePath, content, 'utf8', err => {
        if (err) {
            console.error(`Error writing file: ${err.message}`);
        } else {
            console.log(`File ${filePath} created successfully.`);
        }
    });
}

function deleteFile(filePath) {
    fs.unlink(filePath, err => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
        } else {
            console.log(`File ${filePath} deleted successfully.`);
        }
    });
}

function prompt() {
    rl.question('Enter command: ', answer => {
        const [command, ...args] = answer.split(' ');

        switch (command) {
            case 'list':
                listFiles(args[0] || '.');
                break;
            case 'read':
                readFile(args[0]);
                break;
            case 'create':
                createFile(args[0], args.slice(1).join(' '));
                break;
            case 'delete':
                deleteFile(args[0]);
                break;
            case 'exit':
                rl.close();
                return;
            default:
                console.log('Unknown command. Available commands: list, read, create, delete, exit.');
        }

        prompt();
    });
}

prompt();

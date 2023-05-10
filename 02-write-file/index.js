const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

process.stdout.write('привет, напиши что-нибудь\n');

process.on('exit', function() {
    reader.close();
    writer.close();
    process.stdout.write('ну что ж, пока\n');
})

const writer = fs.createWriteStream(path.join(__dirname, 'output.txt'), {encoding: 'utf-8'});

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

reader.on('line', function(line) {
    if (line === 'exit') {
        process.exit();
        return;
    }
    writer.write(line + '\n');
})




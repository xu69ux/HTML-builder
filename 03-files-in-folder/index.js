const fs = require('fs/promises');
const path = require('path');

const basedir = path.join(__dirname, 'secret-folder');

fs.readdir(basedir, {withFileTypes: true}).then(function(files) {
    for (let file of files) {
        fs.stat(path.join(basedir, file.name)).then(function(stat) {
            if (!stat.isDirectory()) {
                let parsed = path.parse(file.name);
                console.log([parsed.name, parsed.ext.slice(1), Math.round(stat.size / 1024)].join(' - ') + 'kB');    
            }
        })
    }
})




const fs = require('fs/promises');
const path = require('path');

async function copyDir(srcdir, dstdir) {
    await fs.rm(dstdir, { recursive: true, force: true });
    await fs.mkdir(dstdir, { recursive: true });
    let files = await fs.readdir(srcdir, {withFileTypes: true});
    let copyPromises = [];
    for (let file of files) {
        if(file.isDirectory()) {
            copyDir(path.join(srcdir, file.name), path.join(dstdir, file.name));
        } else {
            copyPromises.push(fs.copyFile(path.join(srcdir, file.name), path.join(dstdir, file.name)));
        }
    }
    await Promise.all(copyPromises);
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));

module.exports = copyDir;
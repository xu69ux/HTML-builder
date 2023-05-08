const fs = require('fs/promises');
const path = require('path');

async function mergeStyles(srcDir, dst) {
    let files = await fs.readdir(srcDir, {withFileTypes: true});
    let bundle = [];
    for (let file of files) {
        if (file.isDirectory()) continue;
        if(path.extname(file.name).toLowerCase() !== '.css') continue;

        bundle.push(await fs.readFile(path.join(srcDir, file.name), {encoding: 'utf-8'}));
    }
    fs.writeFile(dst, bundle.join('\n'), {encoding: 'utf-8'});
}

mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'bundle.css'));

module.exports = mergeStyles;
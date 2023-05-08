const fs = require('fs/promises');
const path = require('path');

const copyDir = require('../04-copy-directory/index');
const mergeStyles = require('../05-merge-styles/index');

async function buildPage() {
    let dstdir = path.join(__dirname, 'project-dist');
    await fs.mkdir(dstdir, {recursive: true});
    let components = await loadComponents(path.join(__dirname, 'components'));

    let template = await fs.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});
    template = template.replaceAll(/{{(\w+)}}/g, function(match, p1) {
        return components[p1];
    })
    await fs.writeFile(path.join(dstdir, 'index.html'), template, {encoding: 'utf-8'});

    mergeStyles(path.join(__dirname, 'styles'), path.join(dstdir, 'style.css'));
    copyDir(path.join(__dirname, 'assets'), path.join(dstdir, 'assets'));
}

async function loadComponents(dir) {
    let files = await fs.readdir(dir, {withFileTypes: true});
    let result = {};
    for (let file of files) {
        if (file.isDirectory()) continue;
        if (path.extname(file.name).toLowerCase() !== '.html') continue;
        let value = await fs.readFile(path.join(dir, file.name), {encoding: 'utf-8'});
        let key = file.name.replace(/\.html$/, '');
        result[key] = value;
    }
    return result;
}

buildPage();
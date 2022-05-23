const fs = require('fs/promises');
const path = require('path');

const outputHtmlPath = path.join(__dirname, './project-dist/', 'index.html');
const outputCssPath = path.join(__dirname, './project-dist/', 'style.css');

let components = [];

//await fs.mkdir(path.join(__dirname, './project-dist/'), {recursive: true})

async function createDir() {
    await fs.mkdir(path.join(__dirname, './project-dist/'), {recursive: true});
    await fs.mkdir(path.join(__dirname, './project-dist/assets'), {recursive: true});
}

async function getComponentsFiles() {
    try {
        const filesList = await fs.readdir(path.join(__dirname, './components/'));

        for (const file of filesList) {
            if(path.extname(file) == ".html") {
                let gotFile = path.join(file);
                components.push(gotFile.substring(0,gotFile.length-5));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function generateHtml(){
    createDir();
    const orgHtml = path.join(__dirname, 'template.html');
    await getComponentsFiles();

    const orgFile = fs.readFile(orgHtml);

    let strFile = (await orgFile).toString();

    for(const item of components) {
        const itemHtml = fs.readFile(path.join(__dirname, './components/', item + '.html'));
        strFile = strFile.replace(`{{${item}}}`, (await itemHtml).toString());
    }

    const outputHtmlFile = fs.writeFile(outputHtmlPath, strFile);
}

async function mergeStyles() {
    let buffers = [];
    try {
        const filesList = await fs.readdir(path.join(__dirname, './styles/'));

        for (const file of filesList) {
            if(path.extname(file) == ".css") {
                let gotFile = fs.readFile(path.join(__dirname, './styles/', file));
                
                buffers.push(await gotFile);
            }
        }
        fs.writeFile(outputCssPath, Buffer.concat(buffers));
    } catch (e) {
        console.log(e);
    }
}

async function copyDir(directory, dist) {
    try {
        const filesList = await fs.readdir(path.join(directory));


        for (const file of filesList) {
            fs.copyFile(path.join(directory, file), path.join(dist, file));
        }
    } catch (e) {
        console.log(e);
    }
}

async function copyAssets() {
    try {
        const filesList = await fs.readdir(path.join(__dirname, './assets/'));


        for (const file of filesList) {
            await fs.mkdir(path.join(__dirname, `./project-dist/assets/${file}`), {recursive: true});
            copyDir(path.join(__dirname, `./assets/${file}`), path.join(__dirname, `./project-dist/assets/${file}`));
        }
    } catch (e) {
        console.log(e);
    }
}

function run() {
    generateHtml();
    mergeStyles();
    copyAssets();
}

run();
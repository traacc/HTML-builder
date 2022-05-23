const fs = require('fs/promises');
const path = require('path');


let buffers = [];
const outputFile = path.join(__dirname, 'bundle.css');

async function mergeStyles() {
    try {
        const filesList = await fs.readdir(path.join(__dirname, './styles/'));

        for (const file of filesList) {
            if(path.extname(file) == ".css") {
                gotFile = fs.readFile(path.join(__dirname, './styles/', file));
                
                buffers.push(await gotFile);
            }
        }
        fs.writeFile(outputFile, Buffer.concat(buffers));
    } catch (e) {
        console.log(e);
    }
}

mergeStyles();
const fs = require('fs/promises');
const path = require('path');


async function copyFiles() {
    try {
        const filesList = await fs.readdir(path.join(__dirname, './files/'));

        await fs.mkdir(path.join(__dirname, './files-copy/'), {recursive: true})

        for (const file of filesList) {
            fs.copyFile(path.join(__dirname, './files/', file), path.join(__dirname, './files-copy/', file));
        }
    } catch (e) {
        console.log(e);
    }
}

copyFiles();
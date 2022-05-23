const fs = require('fs/promises');
const path = require('path');

async function showList() {
    try {
        const filesList = await fs.readdir(path.join(__dirname, './secret-folder/'), {withFileTypes: true});

        for (const file of filesList) {
            if(!file.isDirectory())
                console.log(path.parse(file.name).name + " - " + path.parse(file.name).ext.substring(1) + " - " + (await fs.stat(path.join(__dirname, './secret-folder/', file.name))).size + " bytes");
        }
    } catch (e) {
        console.log(e);
    }
}

showList();
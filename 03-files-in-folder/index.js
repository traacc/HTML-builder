const fs = require('fs/promises');
const path = require('path');

async function showList() {
    try {
        const filesList = await fs.readdir(path.join(__dirname, './secret-folder/'), {withFileTypes: true});

        for (const file of filesList) {
            console.log(file);
        }
    } catch (e) {
        console.log(e);
    }
}

showList();
const fs = require('fs');
const out = require('process');
const path = require('path');

const ws = fs.createWriteStream(path.join(__dirname,'.\\text.txt'));
console.log("Good moring Mr. Freeman");
process.on("SIGINT", () => {
    console.log("See you later");
    process.exit();
})
out.stdin.pipe(ws);

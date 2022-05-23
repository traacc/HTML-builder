const fs = require('fs');
const out = require('process');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname,'.\\text.txt'));

rs.pipe(out.stdout);
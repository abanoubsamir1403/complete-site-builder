const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/Abanoub Samir/.gemini/antigravity/brain/2e68d5f6-2e42-45e1-bb32-9f5671b790a5/.user_uploaded';
const files = fs.readdirSync(uploadDir);
fs.writeFileSync('c:/work/MIGRAFILE/scratch_out.txt', JSON.stringify(files, null, 2));

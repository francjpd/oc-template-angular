const fs = require('fs');

function transformFile() {
    try {
        const content = fs.readFileSync(`./src/oc-angular-component-wrapper.js`, 'utf8');
        fs.writeFileSync('./index.js', content.replace(/(\n)(\s\s\s*)/gm, ""));
    } catch (err) {
        console.error(err);
    }
};
transformFile();

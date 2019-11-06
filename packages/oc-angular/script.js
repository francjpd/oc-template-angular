const fs = require('fs');
const path = require('path');

console.log('Copying oc-context to dist');
const source = path.join(process.cwd(), 'projects', 'oc-angular', 'src', 'lib', 'oc-context.interface.ts');
const dest = path.join(process.cwd(), 'dist', 'oc-angular', 'src');

try {
    fs.mkdirSync(dest);
} catch (err) { }
fs.copyFileSync(source, path.join(dest, 'oc-context.interface.ts'));
const fs = require('fs-extra');
const path = require('path');

const componentName = 'yey';

const replaceComponentPath = (name) => (file) => file.replace(/__componentName__/g, name);
const isNotFile = (possibleFile) => !fs.statSync(possibleFile).isFile();

const applyFnToAllFiles = (dir, fn) => {
    const possibleFiles = fs.readdirSync(dir);
    possibleFiles.forEach((possibleFile) => {
        if (isNotFile(path.join(dir, possibleFile))) {
            applyFnToAllFiles(path.join(dir, possibleFile), replaceWith)
        } else {
            const fileModified = fn(fs.readFileSync(path.join(dir, possibleFile), 'UTF-8'));
            fs.writeFileSync(path.join(dir, possibleFile), fileModified);
        }
    });
}
const replaceWith = replaceComponentPath(componentName);
applyFnToAllFiles('./scaffold', replaceWith);
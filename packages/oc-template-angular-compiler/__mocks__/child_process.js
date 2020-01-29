const childProcessReal = require.requireActual('child_process');
const path = require("path");
const { outputFileSync } = require('fs-extra')
// const { writeFileSync } = require('fs'); Not used as it doesn't create folders if they doesn't exist.

let fail = false;
childProcessReal.execSync = jest.fn((command) => {
    if (fail) {
        return;
        // throw 'Error during compilation';
    }

    const outputPath = new RegExp('(--output-path=)([a-zA-Z\:\\\\0-9-_]*)').exec(command)[2];
    outputFileSync(path.join(outputPath, 'main-es2015.js'), `var bundle = function() { return 'bundle'; }`);
});

childProcessReal.spawn = jest.fn((command) => {

    const response = {
        stdout: {
            on: jest.fn()
        },
        stderr: {
            on: jest.fn((data, fn) => fn(data))
        },
        on: jest.fn(() => 'Closing')
    }

    if (fail) {
        return;
        // throw 'Error during compilation';
    }

    const outputPath = new RegExp('(--output-path=)([a-zA-Z\:\\\\0-9-_]*)').exec(command)[2];
    outputFileSync(path.join(outputPath, 'main-es2015.js'), `var bundle = function() { return 'bundle'; }`);

    return response;
});

childProcessReal.setInvalidCompilation = () => fail = true;

childProcessReal.setValidCompilation = () => fail = false;

module.exports = childProcessReal;

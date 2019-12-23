module.exports = (hash, content, nameSpace) => {nameSpace = nameSpace || "oc";return `var ${ nameSpace} = ${nameSpace}|| {};${ nameSpace}.angularComponents = ${nameSpace}.angularComponents || {};${ nameSpace}.angularComponents['${hash}'] = ${nameSpace}.angularComponents['${hash}'] || (function () {var module = ${ content};return module.default}())`;
};

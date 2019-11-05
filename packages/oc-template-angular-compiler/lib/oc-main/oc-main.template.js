
module.exports = (name, path) => {
    return `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OcRootModule } from './oc-root.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(OcRootModule)
.catch(err => console.error(err));`
};


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OcProviderModule } from './oc-provider.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(OcProviderModule)
.catch(err => console.error(err));
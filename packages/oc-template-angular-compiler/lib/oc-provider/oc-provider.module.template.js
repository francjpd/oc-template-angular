const pascalcase = require('pascalcase');
/**
 * 
 * @TODO routing module
 */
module.exports = (name, path) => {
  const namePascalCase = pascalcase(name);
  return `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcProvider } from './oc-provider.component';
import { ${namePascalCase}Module } from '${path.split('.ts')[0]}';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ${namePascalCase}Module
  ],
  declarations: [
    OcProvider
  ],
  bootstrap: [OcProvider]
})
export class OcProviderModule { }
`};

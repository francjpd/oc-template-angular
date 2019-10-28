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
import { OcProviderComponent } from './oc-provider.component';
import { ${namePascalCase}Module } from 'src/app/${name}.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ${namePascalCase}Module
  ],
  declarations: [
    OcProviderComponent
  ],
  exports: [OcProviderComponent],
  bootstrap: [OcProviderComponent]
})
export class OcProviderModule { }
`};

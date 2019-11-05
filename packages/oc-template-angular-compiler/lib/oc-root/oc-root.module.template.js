const pascalcase = require('pascalcase');

module.exports = (name, path) => {
  const namePascalCase = pascalcase(name);
  return `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcRootComponent } from './oc-root.component';
import { ${namePascalCase}Module } from 'src/app/${name}.module';
import { OcModule } from 'oc-angular';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    OcModule,
    ${namePascalCase}Module
  ],
  declarations: [
    OcRootComponent
  ],
  exports: [OcRootComponent],
  bootstrap: [OcRootComponent]
})
export class OcRootModule { }
`};

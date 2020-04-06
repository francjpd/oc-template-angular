const Handlebars = require("handlebars");
module.exports = (() => Handlebars.compile(`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcRootComponent } from './oc-root.component';
import { {{ namePascalCase }} } from 'src/app/{{name}}';
import { OcModule } from 'oc-angular';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    OcModule,
    {{ namePascalCase }}
  ],
  declarations: [
  OcRootComponent
],
  exports: [OcRootComponent],
  bootstrap: [OcRootComponent]
})
export class OcRootModule { }
`))();

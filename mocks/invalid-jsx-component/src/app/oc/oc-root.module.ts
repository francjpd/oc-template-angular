
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcRootComponent } from './oc-root.component';
import { AngularComponentModule } from 'src/app/angular-component.module';
import { OcModule } from 'oc-angular';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    OcModule,
    AngularComponentModule
  ],
  declarations: [
    OcRootComponent
  ],
  exports: [OcRootComponent],
  bootstrap: [OcRootComponent]
})
export class OcRootModule { }

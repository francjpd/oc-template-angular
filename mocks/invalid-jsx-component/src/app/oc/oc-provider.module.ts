
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcProviderComponent } from './oc-provider.component';
import { AngularComponentModule } from 'src/app/angular-component.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AngularComponentModule
  ],
  declarations: [
    OcProviderComponent
  ],
  exports: [OcProviderComponent],
  bootstrap: [OcProviderComponent]
})
export class OcProviderModule { }

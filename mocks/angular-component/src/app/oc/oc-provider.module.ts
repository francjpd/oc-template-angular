
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcProviderComponent } from './oc-provider.component';
import { OcNavbarModule } from 'src/app/oc-navbar.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    OcNavbarModule
  ],
  declarations: [
    OcProviderComponent
  ],
  exports: [OcProviderComponent],
  bootstrap: [OcProviderComponent]
})
export class OcProviderModule { }

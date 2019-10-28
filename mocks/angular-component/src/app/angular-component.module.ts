import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularComponentComponent } from './angular-component.component';
import { AngularComponentRoutingModule } from './angular-component-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AngularComponentRoutingModule
  ],
  exports: [
    AngularComponentComponent
  ],
  declarations: [AngularComponentComponent],
  bootstrap: [AngularComponentComponent]
})
export class AngularComponentModule { }

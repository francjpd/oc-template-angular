import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularComponent } from './angular-component.component';
import { AngularComponentRoutingModule } from './angular-component-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AngularComponentRoutingModule
  ],
  declarations: [AngularComponent],
  bootstrap: [AngularComponent]
})
export class AngularComponentModule { }

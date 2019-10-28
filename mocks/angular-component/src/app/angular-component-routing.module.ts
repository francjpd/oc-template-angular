import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularComponentComponent } from './angular-component.component';

const routes: Routes = [
  { path: '', component: AngularComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AngularComponentRoutingModule { }
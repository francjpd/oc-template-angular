import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { OcPatchRouteComponent } from './oc-patch-route.component';

const routes: Routes = [
    { path: '**', component: OcPatchRouteComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class OcPatchRoutingModule { }

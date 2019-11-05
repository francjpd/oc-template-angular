import { NgModule } from '@angular/core';
import { OcAngularComponent } from './oc-angular.component';
import { OcPatchRoutingModule } from './oc-patch-route/oc-patch-routing.module';
import { OcService } from './oc.service';
import { OcPatchRouteComponent } from './oc-patch-route/oc-patch-route.component';

@NgModule({
  declarations: [
    OcAngularComponent,
    OcPatchRouteComponent
  ],
  providers: [OcService],
  imports: [
    OcPatchRoutingModule
  ],
  exports: [OcAngularComponent]
})
export class OcModule { }

import { NgModule } from '@angular/core';

import { OcService } from './oc.service';
import { OcPatchRouteComponent } from './oc-patch-route/oc-patch-route.component';
import { OcPatchRoutingModule } from './oc-patch-route/oc-patch-routing.module';

@NgModule({
  declarations: [
    OcPatchRouteComponent
  ],
  providers: [OcService],
  imports: [
    OcPatchRoutingModule
  ]
})
export class OcModule { }

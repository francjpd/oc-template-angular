import { NgModule } from '@angular/core';

import { OcService } from './oc.service';
import { OcPatchRouteComponent } from './oc-patch-route/oc-patch-route.component';

@NgModule({
  declarations: [
    OcPatchRouteComponent
  ],
  providers: [OcService]
})
export class OcModule { }

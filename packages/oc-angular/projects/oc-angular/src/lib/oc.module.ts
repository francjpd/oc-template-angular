import { NgModule } from '@angular/core';

import { OcService } from './oc.service';
import { OcPatchRouteComponent } from './oc-patch-route/oc-patch-route.component';

@NgModule({
  declarations: [
    OcPatchRouteComponent
  ],
  providers: [OcService],
  imports: [
   //  OcPatchRoutingModule -- Se deja fuera para que la gente pueda jugar con el useHash o no.
  ]
})
export class OcModule { }

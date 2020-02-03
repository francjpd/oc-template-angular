/*
 * Public API Surface of oc-angular
 */

export * from './lib/oc.service';
export * from './lib/oc.module';
import { Context } from './lib/oc-context.interface';
import { Params } from './lib/oc-context.interface';
export { OcPatchRouteComponent } from './lib/oc-patch-route/oc-patch-route.component';
export { MICROFRONT_COMPATIBILITY } from './lib/oc-patch-route/oc-patch-route.constants';
export { Context, Params };

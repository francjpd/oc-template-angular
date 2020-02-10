
const Handlebars = require("handlebars");
module.exports = (() => Handlebars.compile(`
    import { enableProdMode, NgZone, NgModuleRef } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { ɵAnimationEngine } from '@angular/animations/browser';
    import { OcRootModule } from './oc-root.module';
    import { Router } from '@angular/router';
    
    enableProdMode();

    export const angularComponent = (bootstrapFn: any, {
      AnimationModule,
      Router,
      NgZone
    }: any) => {
      let ngModule: NgModuleRef<OcRootModule>;
      const getInstance = (instanceName) => {
        // Hack to bypass isInAngularZone when there are multiple angular apps running
        // at the same time.
        if (NgZone) {
          NgZone.isInAngularZone = function() {
            // console.log('angular zone for ', instanceName);
            return (window as any).Zone.current.get(instanceName) === true;
          }
        }
        return bootstrapFn().then((module) => {
          if (NgZone) {
            module.injector.get(NgZone)._inner._properties['{{name}}'] = true;
          }
          });
        };
      const destroy = () => {
          const routerRef = ngModule.injector.get<Router>(Router);
          routerRef.dispose();
        try {
          const animationEngine: any = ngModule.injector.get<ɵAnimationEngine>(AnimationModule);
          animationEngine._transitionEngine.flush();
        } catch (err) {}
        try {
            ngModule.destroy();
        } catch (err) {}
      };
      return {
        getInstance,
        destroy
      }
    };
    
    const bootstrap = () => {
      return platformBrowserDynamic().bootstrapModule(OcRootModule)
        .catch(err => console.error(err));
    };
    
    
    const angularInstance = angularComponent(
      bootstrap,
      {
        AnimationModule: ɵAnimationEngine,
        Router,
        NgZone
      }
    );
    
    export default angularInstance;
    `))();

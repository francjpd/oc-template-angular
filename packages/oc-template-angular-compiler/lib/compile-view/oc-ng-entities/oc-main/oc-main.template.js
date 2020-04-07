const Handlebars = require("handlebars");
module.exports = (() => Handlebars.compile(`import { enableProdMode, NgZone, NgModuleRef } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { ɵAnimationEngine } from '@angular/animations/browser';
    import { OcRootModule } from './oc-root.module';
    import { Router } from '@angular/router';
    
    enableProdMode();
    export const angularComponent = (bootstrapFn: any, {
      animationModule,
      router,
      ngZone
    }: any) => {
      let ngModule: NgModuleRef<OcRootModule>;
      const getInstance = (instanceName: any) => {
        // Hack to bypass isInAngularZone when there are multiple angular apps running
        // at the same time.
        if (ngZone) {
          ngZone.isInAngularZone = () => {
            // console.log('angular zone for ', instanceName);
            return (window as any).Zone.current.get(instanceName) === true;
          }
        }
        return bootstrapFn().then((module: any) => {
          if (ngZone) {
            ngModule = module;
            ngModule.injector.get(ngZone)._inner._properties['{{name}}'] = true;
          }
          });
        };
      const destroy = () => {
          const routerRef = ngModule.injector.get<Router>(router);
          routerRef.dispose();
        try {
          const animationEngine: any = ngModule.injector.get<ɵAnimationEngine>(animationModule);
          animationEngine._transitionEngine.flush();
        } catch (err) { }
        try {
            ngModule.destroy();
        } catch (err) { }
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
        animationModule: ɵAnimationEngine,
        router: Router,
        ngZone: NgZone
      }
    );
    
    export default angularInstance;
    `))();

module.exports = (name, path) => {
    return `
    import { enableProdMode, NgZone, NgModuleRef } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { ɵAnimationEngine } from '@angular/animations/browser';
    import { OcRootModule } from './oc-root.module';
    import { Router } from '@angular/router';
    
    enableProdMode();

    export const angularComponent = (bootstrapFn, {
      AnimationModule,
      Router,
      NgZone
    }: any) => {
      let ngModule: NgModuleRef<OcRootModule>;
      const getInstance = async () => {
        ngModule = await bootstrapFn();
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
    `
};

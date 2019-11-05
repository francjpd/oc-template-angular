import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcService {
  public params: BehaviorSubject<any> = new BehaviorSubject(null);
  public oc = (window as any).oc;

  constructor() {
    (window as any).oc.events.on('oc-params:oc-navbar', (event: any, params: any) => {
      this.params.next(params);
    });
    (window as any).oc.events.fire('oc-params-initialized:oc-navbar');
  }

  getData(providerProps: any, parameters: any, cb: (error: any, parameters?: any, props?: any) => void) {
    return (window as any).oc.getData({
      name: providerProps._componentName,
      version: providerProps._componentVersion,
      baseUrl: providerProps._baseUrl,
      parameters
    }, (err: any, data: any) => {
      if (err) {
        return cb(err);
      }
      const { _staticPath, _baseUrl, _componentName, _componentVersion, ...rest } = (data.reactComponent.props as any);
      cb(null, rest, data.reactComponent.props);
    });
  }

  getSetting(providerProps: any, setting: string) {
    const settingHash = {
      name: providerProps._componentName,
      version: providerProps._componentVersion,
      baseUrl: providerProps._baseUrl,
      staticPath: providerProps._staticPath
    };
    return (settingHash as any)[setting];
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Context } from './oc-context.interface';

@Injectable({
  providedIn: 'root'
})
export class OcService {
  public oc = (window as any).oc;

  public context: BehaviorSubject<Context> = new BehaviorSubject(null);

  private params!: any;
  private componentVersion!: string;
  private componentName!: string;
  private baseUrl: string;
  private staticPath: string;

  setBasicData(value: any) {
    if (value._params) {
      this.params = value._params;
    }

    if (value._componentVersion) {
      this.componentVersion = value._componentVersion;
    }

    if (value._componentName) {
      this.componentName = value._componentName;
    }

    if (value._baseUrl) {
      this.baseUrl = value._baseUrl;
    }

    if (value._staticPath) {
      this.staticPath = value._staticPath;
    }
  }

  getData(parameters: any, cb: (error: any, parameters?: any, props?: any) => void) {
    if (this.context.value != null) {
      return this.oc.getData({
        name: this.componentName,
        version: this.componentVersion,
        baseUrl: this.baseUrl,
        parameters
      }, (err: any, data: any) => {
        if (err) {
          return cb(err);
        }
        cb(null, data, data);
      });

    }
  }

}

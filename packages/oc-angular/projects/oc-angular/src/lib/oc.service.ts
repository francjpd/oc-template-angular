import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Context } from './oc-context.interface';

@Injectable({
  providedIn: 'root'
})
export class OcService {
  public oc = (window as any).oc;

  public props: BehaviorSubject<Context> = new BehaviorSubject(null);
  private name: string;
  private version: string;
  private baseUrl: string;
  private staticPath: string;

  constructor() {
    this.oc.events.on('oc-params:oc-navbar', (event: any, params: Context) => {
      if (params != null) {
        this.name = params.params.name;
        this.version = params.templates[0].version;
        this.baseUrl = params.baseUrl;
        this.staticPath = params.staticPath;
        this.props.next(params);
      }
    });
    this.oc.events.fire('oc-params-initialized:oc-navbar');
  }

  getData(parameters: any, cb: (error: any, parameters?: any, props?: any) => void) {
    return this.oc.getData({
      name: this.name,
      version: this.version,
      baseUrl: this.baseUrl,
      parameters
    }, (err: any, data: any) => {
      if (err) {
        return cb(err);
      }
      console.log('data from getData', data);
      cb(null, data, data);
    });
  }

}

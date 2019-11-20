import { BehaviorSubject } from 'rxjs';
import { Context } from './oc-context.interface';
export declare class OcService {
    oc: any;
    context: BehaviorSubject<Context>;
    private params;
    private componentVersion;
    private componentName;
    private baseUrl;
    private staticPath;
    setBasicData(value: any): void;
    getData(parameters: any, cb: (error: any, parameters?: any, props?: any) => void): any;
}

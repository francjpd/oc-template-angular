/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class OcService {
    constructor() {
        this.oc = ((/** @type {?} */ (window))).oc;
        this.context = new BehaviorSubject(null);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setBasicData(value) {
        this.params = value._params;
        this.componentVersion = value._componentVersion;
        this.componentName = value._componentName;
        this.baseUrl = value._baseUrl;
        this.staticPath = value._staticPath;
    }
    /**
     * @param {?} parameters
     * @param {?} cb
     * @return {?}
     */
    getData(parameters, cb) {
        if (this.context.value != null) {
            return this.oc.getData({
                name: this.componentName,
                version: this.componentVersion,
                baseUrl: this.baseUrl,
                parameters
            }, (/**
             * @param {?} err
             * @param {?} data
             * @return {?}
             */
            (err, data) => {
                if (err) {
                    return cb(err);
                }
                cb(null, data, data);
            }));
        }
    }
}
OcService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ OcService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OcService_Factory() { return new OcService(); }, token: OcService, providedIn: "root" });
if (false) {
    /** @type {?} */
    OcService.prototype.oc;
    /** @type {?} */
    OcService.prototype.context;
    /**
     * @type {?}
     * @private
     */
    OcService.prototype.params;
    /**
     * @type {?}
     * @private
     */
    OcService.prototype.componentVersion;
    /**
     * @type {?}
     * @private
     */
    OcService.prototype.componentName;
    /**
     * @type {?}
     * @private
     */
    OcService.prototype.baseUrl;
    /**
     * @type {?}
     * @private
     */
    OcService.prototype.staticPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL29jLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvb2Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQU12QyxNQUFNLE9BQU8sU0FBUztJQUh0QjtRQUlTLE9BQUUsR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXhCLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FrQ3RFOzs7OztJQTFCQyxZQUFZLENBQUMsS0FBVTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUV0QyxDQUFDOzs7Ozs7SUFFRCxPQUFPLENBQUMsVUFBZSxFQUFFLEVBQXVEO1FBQzlFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDeEIsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQzlCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsVUFBVTthQUNYOzs7OztZQUFFLENBQUMsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO2dCQUN6QixJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7Z0JBQ0QsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7U0FFSjtJQUNILENBQUM7OztZQXRDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7O0lBRUMsdUJBQStCOztJQUUvQiw0QkFBcUU7Ozs7O0lBRXJFLDJCQUFxQjs7Ozs7SUFDckIscUNBQWtDOzs7OztJQUNsQyxrQ0FBK0I7Ozs7O0lBQy9CLDRCQUF3Qjs7Ozs7SUFDeEIsK0JBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vb2MtY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgT2NTZXJ2aWNlIHtcclxuICBwdWJsaWMgb2MgPSAod2luZG93IGFzIGFueSkub2M7XHJcblxyXG4gIHB1YmxpYyBjb250ZXh0OiBCZWhhdmlvclN1YmplY3Q8Q29udGV4dD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG5cclxuICBwcml2YXRlIHBhcmFtcyE6IGFueTtcclxuICBwcml2YXRlIGNvbXBvbmVudFZlcnNpb24hOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnROYW1lITogc3RyaW5nO1xyXG4gIHByaXZhdGUgYmFzZVVybDogc3RyaW5nO1xyXG4gIHByaXZhdGUgc3RhdGljUGF0aDogc3RyaW5nO1xyXG5cclxuICBzZXRCYXNpY0RhdGEodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5wYXJhbXMgPSB2YWx1ZS5fcGFyYW1zO1xyXG4gICAgdGhpcy5jb21wb25lbnRWZXJzaW9uID0gdmFsdWUuX2NvbXBvbmVudFZlcnNpb247XHJcbiAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSB2YWx1ZS5fY29tcG9uZW50TmFtZTtcclxuICAgIHRoaXMuYmFzZVVybCA9IHZhbHVlLl9iYXNlVXJsO1xyXG4gICAgdGhpcy5zdGF0aWNQYXRoID0gdmFsdWUuX3N0YXRpY1BhdGg7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YShwYXJhbWV0ZXJzOiBhbnksIGNiOiAoZXJyb3I6IGFueSwgcGFyYW1ldGVycz86IGFueSwgcHJvcHM/OiBhbnkpID0+IHZvaWQpIHtcclxuICAgIGlmICh0aGlzLmNvbnRleHQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vYy5nZXREYXRhKHtcclxuICAgICAgICBuYW1lOiB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgdmVyc2lvbjogdGhpcy5jb21wb25lbnRWZXJzaW9uLFxyXG4gICAgICAgIGJhc2VVcmw6IHRoaXMuYmFzZVVybCxcclxuICAgICAgICBwYXJhbWV0ZXJzXHJcbiAgICAgIH0sIChlcnI6IGFueSwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgcmV0dXJuIGNiKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNiKG51bGwsIGRhdGEsIGRhdGEpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
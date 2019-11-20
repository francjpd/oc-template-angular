/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
var OcService = /** @class */ (function () {
    function OcService() {
        this.oc = ((/** @type {?} */ (window))).oc;
        this.context = new BehaviorSubject(null);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    OcService.prototype.setBasicData = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.params = value._params;
        this.componentVersion = value._componentVersion;
        this.componentName = value._componentName;
        this.baseUrl = value._baseUrl;
        this.staticPath = value._staticPath;
    };
    /**
     * @param {?} parameters
     * @param {?} cb
     * @return {?}
     */
    OcService.prototype.getData = /**
     * @param {?} parameters
     * @param {?} cb
     * @return {?}
     */
    function (parameters, cb) {
        if (this.context.value != null) {
            return this.oc.getData({
                name: this.componentName,
                version: this.componentVersion,
                baseUrl: this.baseUrl,
                parameters: parameters
            }, (/**
             * @param {?} err
             * @param {?} data
             * @return {?}
             */
            function (err, data) {
                if (err) {
                    return cb(err);
                }
                cb(null, data, data);
            }));
        }
    };
    OcService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ OcService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OcService_Factory() { return new OcService(); }, token: OcService, providedIn: "root" });
    return OcService;
}());
export { OcService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL29jLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvb2Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUd2QztJQUFBO1FBSVMsT0FBRSxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFeEIsWUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQWtDdEU7Ozs7O0lBMUJDLGdDQUFZOzs7O0lBQVosVUFBYSxLQUFVO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBRXRDLENBQUM7Ozs7OztJQUVELDJCQUFPOzs7OztJQUFQLFVBQVEsVUFBZSxFQUFFLEVBQXVEO1FBQzlFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDeEIsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQzlCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsVUFBVSxZQUFBO2FBQ1g7Ozs7O1lBQUUsVUFBQyxHQUFRLEVBQUUsSUFBUztnQkFDckIsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hCO2dCQUNELEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBRUo7SUFDSCxDQUFDOztnQkF0Q0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O29CQU5EO0NBNENDLEFBeENELElBd0NDO1NBckNZLFNBQVM7OztJQUNwQix1QkFBK0I7O0lBRS9CLDRCQUFxRTs7Ozs7SUFFckUsMkJBQXFCOzs7OztJQUNyQixxQ0FBa0M7Ozs7O0lBQ2xDLGtDQUErQjs7Ozs7SUFDL0IsNEJBQXdCOzs7OztJQUN4QiwrQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9vYy1jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPY1NlcnZpY2Uge1xyXG4gIHB1YmxpYyBvYyA9ICh3aW5kb3cgYXMgYW55KS5vYztcclxuXHJcbiAgcHVibGljIGNvbnRleHQ6IEJlaGF2aW9yU3ViamVjdDxDb250ZXh0PiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcblxyXG4gIHByaXZhdGUgcGFyYW1zITogYW55O1xyXG4gIHByaXZhdGUgY29tcG9uZW50VmVyc2lvbiE6IHN0cmluZztcclxuICBwcml2YXRlIGNvbXBvbmVudE5hbWUhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBzdGF0aWNQYXRoOiBzdHJpbmc7XHJcblxyXG4gIHNldEJhc2ljRGF0YSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLnBhcmFtcyA9IHZhbHVlLl9wYXJhbXM7XHJcbiAgICB0aGlzLmNvbXBvbmVudFZlcnNpb24gPSB2YWx1ZS5fY29tcG9uZW50VmVyc2lvbjtcclxuICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IHZhbHVlLl9jb21wb25lbnROYW1lO1xyXG4gICAgdGhpcy5iYXNlVXJsID0gdmFsdWUuX2Jhc2VVcmw7XHJcbiAgICB0aGlzLnN0YXRpY1BhdGggPSB2YWx1ZS5fc3RhdGljUGF0aDtcclxuXHJcbiAgfVxyXG5cclxuICBnZXREYXRhKHBhcmFtZXRlcnM6IGFueSwgY2I6IChlcnJvcjogYW55LCBwYXJhbWV0ZXJzPzogYW55LCBwcm9wcz86IGFueSkgPT4gdm9pZCkge1xyXG4gICAgaWYgKHRoaXMuY29udGV4dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9jLmdldERhdGEoe1xyXG4gICAgICAgIG5hbWU6IHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICB2ZXJzaW9uOiB0aGlzLmNvbXBvbmVudFZlcnNpb24sXHJcbiAgICAgICAgYmFzZVVybDogdGhpcy5iYXNlVXJsLFxyXG4gICAgICAgIHBhcmFtZXRlcnNcclxuICAgICAgfSwgKGVycjogYW55LCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2IobnVsbCwgZGF0YSwgZGF0YSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==
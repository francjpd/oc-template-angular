import { Injectable, ɵɵdefineInjectable, Component, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OcService {
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
/** @nocollapse */ OcService.ngInjectableDef = ɵɵdefineInjectable({ factory: function OcService_Factory() { return new OcService(); }, token: OcService, providedIn: "root" });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @ts-ignore
class OcPatchRouteComponent {
}
OcPatchRouteComponent.decorators = [
    { type: Component, args: [{
                selector: 'oc-patch-route',
                template: ''
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OcModule {
}
OcModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    OcPatchRouteComponent
                ],
                providers: [OcService],
                imports: [
                //  OcPatchRoutingModule -- Se deja fuera para que la gente pueda jugar con el useHash o no.
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { OcModule, OcPatchRouteComponent, OcService };
//# sourceMappingURL=oc-angular.js.map

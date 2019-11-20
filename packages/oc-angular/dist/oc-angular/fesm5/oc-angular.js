import { Injectable, ɵɵdefineInjectable, Component, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ OcService.ngInjectableDef = ɵɵdefineInjectable({ factory: function OcService_Factory() { return new OcService(); }, token: OcService, providedIn: "root" });
    return OcService;
}());
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
var OcPatchRouteComponent = /** @class */ (function () {
    function OcPatchRouteComponent() {
    }
    OcPatchRouteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'oc-patch-route',
                    template: ''
                }] }
    ];
    return OcPatchRouteComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OcModule = /** @class */ (function () {
    function OcModule() {
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
    return OcModule;
}());

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

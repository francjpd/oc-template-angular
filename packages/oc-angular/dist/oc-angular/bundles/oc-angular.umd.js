(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('oc-angular', ['exports', '@angular/core', 'rxjs'], factory) :
    (global = global || self, factory(global['oc-angular'] = {}, global.ng.core, global.rxjs));
}(this, (function (exports, core, rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OcService = /** @class */ (function () {
        function OcService() {
            this.oc = ((/** @type {?} */ (window))).oc;
            this.context = new rxjs.BehaviorSubject(null);
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ OcService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function OcService_Factory() { return new OcService(); }, token: OcService, providedIn: "root" });
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
            { type: core.Component, args: [{
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
            { type: core.NgModule, args: [{
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

    exports.OcModule = OcModule;
    exports.OcPatchRouteComponent = OcPatchRouteComponent;
    exports.OcService = OcService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=oc-angular.umd.js.map

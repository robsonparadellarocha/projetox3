"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const tenant_guard_1 = require("./tenant.guard");
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("./tenant/tenant.service");
let TenantModule = class TenantModule {
};
TenantModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [tenant_service_1.TenantService, tenant_guard_1.TenantGuard],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const tenant_service_1 = require("./../tenant/tenant/tenant.service");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionModel, tenantService) {
        this.transactionModel = transactionModel;
        this.tenantService = tenantService;
    }
    create(createTransactionDto) {
        return this.transactionModel.create(Object.assign(Object.assign({}, createTransactionDto), { subdomain: this.tenantService.subdomain }));
    }
    findAll() {
        console.log(this.tenantService.subdomain);
        return this.transactionModel.findAll({
            where: {
                subdomain: this.tenantService.subdomain
            }
        });
    }
    findOne(id) {
        return `This action returns a #${id} transaction`;
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [Object, tenant_service_1.TenantService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = exports.CategoryRules = void 0;
const classValidatorFields_1 = require("#seedwork/domain/validators/classValidatorFields");
const class_validator_1 = require("class-validator");
class CategoryRules {
    constructor({ title, description, active, createdAt }) {
        Object.assign(this, { title, description, active, createdAt });
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(256),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CategoryRules.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CategoryRules.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CategoryRules.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CategoryRules.prototype, "createdAt", void 0);
exports.CategoryRules = CategoryRules;
class CategoryValidator extends classValidatorFields_1.default {
    validate(data) {
        return super.validate(new CategoryRules(data !== null && data !== void 0 ? data : {}));
    }
}
exports.CategoryValidator = CategoryValidator;
class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}
exports.default = CategoryValidatorFactory;

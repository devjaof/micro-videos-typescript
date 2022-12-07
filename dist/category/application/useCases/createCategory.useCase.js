"use strict";
// Single responsability. Só existe um motivo para mudança neste caso de uso,
// isso não significa ter apenas um método na classe, mas sim, que o método principal só
// será alterado caso a forma de criar uma categoria tbm seja alterada.
// não fazer extends em casos de uso, isso quebra o single responsability
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../domain/entities/category");
const categoryOutput_1 = require("../dtos/categoryOutput");
class CreateCategoryUseCase {
    // dependency injection & dependency inversion
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = new category_1.Category(input);
        await this.categoryRepo.insert(entity);
        return categoryOutput_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = CreateCategoryUseCase;

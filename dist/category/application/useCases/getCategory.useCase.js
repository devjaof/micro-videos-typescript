"use strict";
// Single responsability. Só existe um motivo para mudança neste caso de uso,
// isso não significa ter apenas um método na classe, mas sim, que o método principal só
// será alterado caso a forma de criar uma categoria tbm seja alterada.
// não fazer extends em casos de uso, isso quebra o single responsability
Object.defineProperty(exports, "__esModule", { value: true });
const categoryOutput_1 = require("../dtos/categoryOutput");
class GetCategoryUseCase {
    // dependency injection & dependency inversion
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        return categoryOutput_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = GetCategoryUseCase;

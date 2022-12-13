"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
class GetCategoryUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        return categoryOutput_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = GetCategoryUseCase;

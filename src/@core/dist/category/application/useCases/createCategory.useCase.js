"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
class CreateCategoryUseCase {
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

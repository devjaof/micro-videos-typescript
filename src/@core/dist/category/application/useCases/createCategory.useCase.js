"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryUseCase = void 0;
const category_1 = require("#category/domain/entities/category");
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
var CreateCategoryUseCase;
(function (CreateCategoryUseCase) {
    class UseCase {
        constructor(categoryRepo) {
            this.categoryRepo = categoryRepo;
        }
        async execute(input) {
            const entity = new category_1.Category(input);
            await this.categoryRepo.insert(entity);
            return categoryOutput_1.CategoryOutputMapper.toOutput(entity);
        }
    }
    CreateCategoryUseCase.UseCase = UseCase;
})(CreateCategoryUseCase = exports.CreateCategoryUseCase || (exports.CreateCategoryUseCase = {}));
exports.default = CreateCategoryUseCase;

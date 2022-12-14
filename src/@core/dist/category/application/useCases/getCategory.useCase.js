"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryUseCase = void 0;
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
var GetCategoryUseCase;
(function (GetCategoryUseCase) {
    class UseCase {
        constructor(categoryRepo) {
            this.categoryRepo = categoryRepo;
        }
        async execute(input) {
            const entity = await this.categoryRepo.findById(input.id);
            return categoryOutput_1.CategoryOutputMapper.toOutput(entity);
        }
    }
    GetCategoryUseCase.UseCase = UseCase;
})(GetCategoryUseCase = exports.GetCategoryUseCase || (exports.GetCategoryUseCase = {}));
exports.default = GetCategoryUseCase;

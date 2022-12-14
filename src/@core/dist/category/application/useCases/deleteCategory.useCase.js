"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryUseCase = void 0;
var DeleteCategoryUseCase;
(function (DeleteCategoryUseCase) {
    class UseCase {
        constructor(categoryRepository) {
            this.categoryRepository = categoryRepository;
        }
        async execute(input) {
            const entity = await this.categoryRepository.findById(input.id);
            await this.categoryRepository.delete(entity.id);
        }
    }
    DeleteCategoryUseCase.UseCase = UseCase;
})(DeleteCategoryUseCase = exports.DeleteCategoryUseCase || (exports.DeleteCategoryUseCase = {}));
exports.default = DeleteCategoryUseCase;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryUseCase = void 0;
class DeleteCategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute(input) {
        const entity = await this.categoryRepository.findById(input.id);
        await this.categoryRepository.delete(entity.id);
    }
}
exports.DeleteCategoryUseCase = DeleteCategoryUseCase;
exports.default = DeleteCategoryUseCase;

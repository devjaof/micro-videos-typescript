"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
class UpdateCategoryUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        entity.update(input.title, input.description);
        if (input.active === true) {
            entity.activate();
        }
        else if (input.active === false) {
            entity.deactivate();
        }
        await this.categoryRepo.update(entity);
        return categoryOutput_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = UpdateCategoryUseCase;

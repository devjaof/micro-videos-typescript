"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationOutput_1 = require("#seedwork/application/dtos/paginationOutput");
const category_repository_1 = require("#category/domain/repository/category.repository");
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
class ListCategoriesUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const params = new category_repository_1.default.SearchParams(input);
        const searchResult = await this.categoryRepo.search(params);
        return this.toOutput(searchResult);
    }
    toOutput(searchResult) {
        return Object.assign({ items: searchResult.items.map((item) => categoryOutput_1.CategoryOutputMapper.toOutput(item)) }, paginationOutput_1.PaginationOutputMapper.toOutput(searchResult));
    }
}
exports.default = ListCategoriesUseCase;

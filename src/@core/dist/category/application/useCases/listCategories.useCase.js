"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesUseCase = void 0;
const paginationOutput_1 = require("#seedwork/application/dtos/paginationOutput");
const category_repository_1 = require("#category/domain/repository/category.repository");
const categoryOutput_1 = require("#category/application/dtos/categoryOutput");
var ListCategoriesUseCase;
(function (ListCategoriesUseCase) {
    class UseCase {
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
    ListCategoriesUseCase.UseCase = UseCase;
})(ListCategoriesUseCase = exports.ListCategoriesUseCase || (exports.ListCategoriesUseCase = {}));
exports.default = ListCategoriesUseCase;

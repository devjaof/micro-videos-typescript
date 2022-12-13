"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const repositoryContracts_1 = require("#seedwork/domain/repository/repositoryContracts");
var CategoryRepository;
(function (CategoryRepository) {
    class SearchParams extends repositoryContracts_1.SearchParams {
    }
    CategoryRepository.SearchParams = SearchParams;
    class SearchResult extends repositoryContracts_1.SearchResult {
    }
    CategoryRepository.SearchResult = SearchResult;
})(CategoryRepository = exports.CategoryRepository || (exports.CategoryRepository = {}));
exports.default = CategoryRepository;

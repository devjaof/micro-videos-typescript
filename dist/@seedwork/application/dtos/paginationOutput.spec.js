"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositoryContracts_1 = require("../../domain/repository/repositoryContracts");
const paginationOutput_1 = require("./paginationOutput");
describe('PaginationOutputMapper unit tests', () => {
    it('should convert SearchResult into output', () => {
        const result = new repositoryContracts_1.SearchResult({
            items: ['fake'],
            total: 1,
            currentPage: 1,
            perPage: 2,
            sortField: 'title',
            sort: 'asc',
            filter: 'fake'
        });
        const output = paginationOutput_1.PaginationOutputMapper.toOutput(result);
        expect(output).toStrictEqual({
            total: 1,
            currentPage: 1,
            perPage: 2,
            lastPage: 1
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositoryContracts_1 = require("#seedwork/domain/repository/repositoryContracts");
describe("Search unit tests", () => {
    describe("SearchParams unit tests", () => {
        test("page prop", () => {
            const arrange = [
                { page: null, expected: 1 },
                { page: undefined, expected: 1 },
                { page: "", expected: 1 },
                { page: "fake", expected: 1 },
                { page: -1, expected: 1 },
                { page: {}, expected: 1 },
                { page: 5.5, expected: 1 },
                { page: true, expected: 1 },
                { page: false, expected: 1 },
                { page: 1, expected: 1 },
                { page: 2, expected: 2 },
            ];
            arrange.forEach(item => {
                expect(new repositoryContracts_1.SearchParams({ page: item.page }).page).toBe(item.expected);
            });
        });
        test("perPage prop", () => {
            const arrange = [
                { perPage: "", expected: 15 },
                { perPage: "fake", expected: 15 },
                { perPage: -1, expected: 15 },
                { perPage: {}, expected: 15 },
                { perPage: 5.5, expected: 15 },
                { perPage: true, expected: 15 },
                { perPage: null, expected: 15 },
                { perPage: false, expected: 15 },
                { perPage: undefined, expected: 15 },
                { perPage: 1, expected: 1 },
                { perPage: 2, expected: 2 },
                { perPage: 400, expected: 400 },
            ];
            arrange.forEach(item => {
                expect(new repositoryContracts_1.SearchParams({ perPage: item.perPage }).perPage).toBe(item.expected);
            });
        });
        test("sortField prop", () => {
            const params = new repositoryContracts_1.SearchParams();
            expect(params.sortField).toBeNull;
            const arrange = [
                { sortField: undefined, expected: null },
                { sortField: null, expected: null },
                { sortField: "", expected: null },
                { sortField: {}, expected: "[object Object]" },
                { sortField: -1, expected: "-1" },
                { sortField: 5.5, expected: "5.5" },
                { sortField: true, expected: "true" },
                { sortField: false, expected: "false" },
                { sortField: "field", expected: "field" },
            ];
            arrange.forEach(item => {
                expect(new repositoryContracts_1.SearchParams({ sortField: item.sortField }).sortField).toBe(item.expected);
            });
        });
        test("sort prop", () => {
            let params = new repositoryContracts_1.SearchParams();
            expect(params.sort).toBeNull;
            params = new repositoryContracts_1.SearchParams({ sortField: null });
            expect(params.sort).toBeNull;
            params = new repositoryContracts_1.SearchParams({ sortField: undefined });
            expect(params.sort).toBeNull;
            params = new repositoryContracts_1.SearchParams({ sortField: "" });
            expect(params.sort).toBeNull;
            const arrange = [
                { sort: undefined, expected: "desc" },
                { sort: null, expected: "desc" },
                { sort: "", expected: "desc" },
                { sort: {}, expected: "desc" },
                { sort: 0, expected: "desc" },
                { sort: 5.5, expected: "desc" },
                { sort: true, expected: "desc" },
                { sort: false, expected: "desc" },
                { sort: "asc", expected: "asc" },
                { sort: "ASC", expected: "asc" },
            ];
            arrange.forEach(item => {
                expect(new repositoryContracts_1.SearchParams({ sortField: "field", sort: item.sort }).sort).toBe(item.expected);
            });
        });
    });
    describe("SeachResult unit tests", () => {
        test('constructor props', () => {
            let result = new repositoryContracts_1.SearchResult({
                items: ['entity1', 'entity2'],
                total: 4,
                currentPage: 1,
                perPage: 2,
                sortField: null,
                sort: null,
                filter: null
            });
            expect(result.toJSON()).toStrictEqual({
                items: ['entity1', 'entity2'],
                total: 4,
                currentPage: 1,
                perPage: 2,
                lastPage: 2,
                sortField: null,
                sort: null,
                filter: null
            });
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryInMemory_repository_1 = require("#category/infra/repository/categoryInMemory.repository");
const listCategories_useCase_1 = require("#category/application/useCases/listCategories.useCase");
const category_repository_1 = require("#category/domain/repository/category.repository");
const category_1 = require("#category/domain/entities/category");
describe("listcategory use case unit tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new categoryInMemory_repository_1.default();
        useCase = new listCategories_useCase_1.default(repository);
    });
    test('toOutput method', () => {
        let result = new category_repository_1.default.SearchResult({
            items: [],
            total: 1,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortField: null,
            filter: null
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            currentPage: 1,
            perPage: 2,
            lastPage: 1
        });
        const entity = new category_1.Category({ title: 'oi', description: 'eita' });
        result = new category_repository_1.default.SearchResult({
            items: [entity],
            total: 1,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortField: null,
            filter: null
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            currentPage: 1,
            perPage: 2,
            lastPage: 1
        });
    });
    it('should return output with categories ordered by createdAt', async () => {
        const dateNow = new Date();
        const items = [
            new category_1.Category({ title: 'test 1', createdAt: dateNow }),
            new category_1.Category({ title: 'test 2', createdAt: new Date(dateNow.getTime() + 100) }),
            new category_1.Category({ title: 'test 3', createdAt: new Date(dateNow.getTime() + 200) }),
        ];
        repository.items = items;
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map(i => i.toJSON()),
            total: 3,
            currentPage: 1,
            perPage: 15,
            lastPage: 1
        });
    });
    it('should return output using pagination, sort and filter', async () => {
        const items = [
            new category_1.Category({ title: 'test' }),
            new category_1.Category({ title: 'tEst' }),
            new category_1.Category({ title: 'BBB' }),
            new category_1.Category({ title: 'bBb' }),
        ];
        repository.items = items;
        const output = await useCase.execute({
            page: 1,
            perPage: 2,
            sortField: "title",
            sort: null,
            filter: 'b'
        });
        expect(output).toStrictEqual({
            items: [items[3].toJSON(), items[2].toJSON()],
            total: 4,
            currentPage: 1,
            perPage: 2,
            lastPage: 2,
        });
    });
});

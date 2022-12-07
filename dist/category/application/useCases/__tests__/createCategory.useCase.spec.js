"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryInMemory_repository_1 = require("../../../infra/repository/categoryInMemory.repository");
const createCategory_useCase_1 = require("../createCategory.useCase");
describe("createcategory use case unit tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new categoryInMemory_repository_1.default();
        useCase = new createCategory_useCase_1.default(repository);
    });
    it('should create a category', async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
        let output = await useCase.execute({ title: 'titolo tijolo feijão' });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            title: 'titolo tijolo feijão',
            description: null,
            active: true,
            createdAt: repository.items[0].createdAt
        });
        output = await useCase.execute({
            title: 'titolo tijolo feijão',
            description: 'descriptão'
        });
        expect(output).toStrictEqual({
            id: repository.items[1].id,
            title: 'titolo tijolo feijão',
            description: 'descriptão',
            active: true,
            createdAt: repository.items[0].createdAt
        });
        output = await useCase.execute({
            title: 'titolo tijolo feijão',
            description: 'descriptão',
            active: false
        });
        expect(output).toStrictEqual({
            id: repository.items[2].id,
            title: 'titolo tijolo feijão',
            description: 'descriptão',
            active: false,
            createdAt: repository.items[0].createdAt
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const notFound_error_1 = require("#seedwork/domain/errors/notFound.error");
const categoryInMemory_repository_1 = require("#category/infra/repository/categoryInMemory.repository");
const getCategory_useCase_1 = require("#category/application/useCases/getCategory.useCase");
describe("getcategory use case unit tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new categoryInMemory_repository_1.default();
        useCase = new getCategory_useCase_1.default(repository);
    });
    it('should throw error when category not found', async () => {
        expect(async () => { await useCase.execute({ id: 'fake id' }); })
            .rejects.toThrow(new notFound_error_1.default(`Entity not found using id fake id`));
    });
    it('should get category', async () => {
        const items = [
            new category_1.Category({ title: 'teste' })
        ];
        repository.items = items;
        const output = await useCase.execute({ id: items[0].id });
        expect(output)
            .toStrictEqual({
            id: items[0].id,
            title: 'teste',
            description: null,
            active: true,
            createdAt: items[0].createdAt
        });
    });
});

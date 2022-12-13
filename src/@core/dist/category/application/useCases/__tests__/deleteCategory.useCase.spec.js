"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const notFound_error_1 = require("#seedwork/domain/errors/notFound.error");
const categoryInMemory_repository_1 = require("#category/infra/repository/categoryInMemory.repository");
const deleteCategory_useCase_1 = require("#category/application/useCases/deleteCategory.useCase");
const getCategory_useCase_1 = require("#category/application/useCases/getCategory.useCase");
describe("DeleteCategoryUseCase unit tests", () => {
    let deleteUseCase;
    let getUseCase;
    let repository;
    beforeEach(() => {
        repository = new categoryInMemory_repository_1.default();
        deleteUseCase = new deleteCategory_useCase_1.default(repository);
        getUseCase = new getCategory_useCase_1.default(repository);
    });
    it('should throw error when category not found', async () => {
        expect(async () => { await deleteUseCase.execute({ id: 'fake id' }); })
            .rejects.toThrow(new notFound_error_1.default(`Entity not found using id fake id`));
    });
    it('should delete a category', async () => {
        const items = [
            new category_1.Category({ title: 'teste' })
        ];
        repository.items = items;
        let output = await getUseCase.execute({ id: items[0].id });
        expect(output).toStrictEqual({
            id: items[0].id,
            title: 'teste',
            description: null,
            active: true,
            createdAt: items[0].createdAt
        });
        output = await deleteUseCase.execute({ id: items[0].id });
        expect(output).toBeUndefined();
    });
});

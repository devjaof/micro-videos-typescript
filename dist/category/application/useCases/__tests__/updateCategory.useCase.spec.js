"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const notFound_error_1 = require("@seedwork/domain/errors/notFound.error");
const categoryInMemory_repository_1 = require("../../../infra/repository/categoryInMemory.repository");
const updateCategory_useCase_1 = require("../updateCategory.useCase");
describe("createcategory use case unit tests", () => {
    let updateUseCase;
    let repository;
    beforeEach(() => {
        repository = new categoryInMemory_repository_1.default();
        updateUseCase = new updateCategory_useCase_1.default(repository);
    });
    it('should throw error when category not found', async () => {
        expect(async () => { await updateUseCase.execute({ id: 'fake id', title: 'fake title' }); })
            .rejects.toThrow(new notFound_error_1.default(`Entity not found using id fake id`));
    });
    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const category = new category_1.Category({ title: "filme" });
        repository.items = [category];
        let output = await updateUseCase.execute({ id: category.id, title: 'titolo tijolo feijão' });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            title: 'titolo tijolo feijão',
            description: null,
            active: true,
            createdAt: repository.items[0].createdAt
        });
        output = await updateUseCase.execute({
            id: category.id,
            title: 'titolo tijolo feijão',
            description: 'descriptão'
        });
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            title: 'titolo tijolo feijão',
            description: 'descriptão',
            active: true,
            createdAt: repository.items[0].createdAt
        });
        output = await updateUseCase.execute({
            id: repository.items[0].id,
            title: 'titolo tijolo feijão',
            description: 'descriptão',
            active: false
        });
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            title: 'titolo tijolo feijão',
            description: 'descriptão',
            active: false,
            createdAt: repository.items[0].createdAt
        });
    });
});

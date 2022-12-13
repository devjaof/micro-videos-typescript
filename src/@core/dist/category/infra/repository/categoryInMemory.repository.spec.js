"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const categoryInMemory_repository_1 = require("./categoryInMemory.repository");
describe("CategoryInMemoryRepository unit tests", () => {
    let repository;
    beforeEach(() => repository = new categoryInMemory_repository_1.default);
    it("should not filter when filter object is null", async () => {
        const items = [new category_1.Category({ title: 'teste', description: 'descriptiontiontion', active: true })];
        const filterSpy = jest.spyOn(items, "filter");
        const filteredItems = await repository['applyFilter'](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(filteredItems).toStrictEqual(items);
    });
    it("should filter when filter object is correct", async () => {
        const items = [
            new category_1.Category({ title: 'teste', description: 'descriptiontiontion', active: true }),
            new category_1.Category({ title: 'banana', description: 'descriptiontiontion', active: true }),
            new category_1.Category({ title: 'BANANA', description: 'descriptiontiontion', active: true }),
            new category_1.Category({ title: 'pão', description: 'descriptiontiontion', active: true }),
        ];
        const filterSpy = jest.spyOn(items, "filter");
        const filteredItems = await repository['applyFilter'](items, 'banana');
        expect(filterSpy).toHaveBeenCalled();
        expect(filteredItems).toStrictEqual([items[1], items[2]]);
    });
    it("should sort by createdAt when sortField is null", async () => {
        const dateNow = new Date();
        const items = [
            new category_1.Category({ title: 'teste', createdAt: dateNow }),
            new category_1.Category({ title: 'testin', createdAt: new Date(dateNow.getTime() + 100) }),
            new category_1.Category({ title: 'teston', createdAt: new Date(dateNow.getTime() + 200) })
        ];
        const sortedItems = await repository['applySort'](items, null, null);
        expect(sortedItems).toStrictEqual([items[2], items[1], items[0]]);
    });
    it("should sort by selected prop", async () => {
        const dateNow = new Date();
        const items = [
            new category_1.Category({ title: 'pãozinho', createdAt: dateNow }),
            new category_1.Category({ title: 'testa', createdAt: new Date(dateNow.getTime() + 100) }),
            new category_1.Category({ title: 'banana', createdAt: new Date(dateNow.getTime() + 200) })
        ];
        let sortedItems = await repository['applySort'](items, 'title', null);
        expect(sortedItems).toStrictEqual([items[1], items[0], items[2]]);
        sortedItems = await repository['applySort'](items, 'title', 'asc');
        expect(sortedItems).toStrictEqual([items[2], items[0], items[1]]);
    });
});

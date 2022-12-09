import { Category } from "#category/domain/entities/category";
import CategoryInMemoryRepository from "./categoryInMemory.repository";

describe("CategoryInMemoryRepository unit tests", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => repository = new CategoryInMemoryRepository);
  
  it("should not filter when filter object is null", async () => {
    const items = [new Category({title: 'teste', description: 'descriptiontiontion', active: true})];
    const filterSpy = jest.spyOn(items, "filter" as any);

    const filteredItems = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(filteredItems).toStrictEqual(items);
  })

  it("should filter when filter object is correct", async () => {
    const items = [
      new Category({title: 'teste', description: 'descriptiontiontion', active: true}),
      new Category({title: 'banana', description: 'descriptiontiontion', active: true}),
      new Category({title: 'BANANA', description: 'descriptiontiontion', active: true}),
      new Category({title: 'pão', description: 'descriptiontiontion', active: true}),
    ];

    const filterSpy = jest.spyOn(items, "filter" as any);

    const filteredItems = await repository['applyFilter'](items, 'banana');
    expect(filterSpy).toHaveBeenCalled();
    expect(filteredItems).toStrictEqual([items[1], items[2]]);
  })

  it("should sort by createdAt when sortField is null", async () => {
    const dateNow = new Date();

    const items = [
      new Category({title: 'teste', createdAt: dateNow}),
      new Category({title: 'testin', createdAt: new Date(dateNow.getTime() + 100)}),
      new Category({title: 'teston',  createdAt: new Date(dateNow.getTime() + 200)})
    ];

    const sortedItems = await repository['applySort'](items, null, null);

    expect(sortedItems).toStrictEqual([items[2], items[1], items[0]]);
  })

  it("should sort by selected prop", async () => {
    const dateNow = new Date();

    const items = [
      new Category({title: 'pãozinho', createdAt: dateNow}),
      new Category({title: 'testa', createdAt: new Date(dateNow.getTime() + 100)}),
      new Category({title: 'banana',  createdAt: new Date(dateNow.getTime() + 200)})
    ];

    let sortedItems = await repository['applySort'](items, 'title', null);
    expect(sortedItems).toStrictEqual([items[1], items[0], items[2]]);

    sortedItems = await repository['applySort'](items, 'title', 'asc');
    expect(sortedItems).toStrictEqual([items[2], items[0], items[1]]);
  })
})
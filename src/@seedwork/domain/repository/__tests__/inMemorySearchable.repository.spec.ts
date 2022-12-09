import Entity from "#seedwork/domain/entity/entity";
import { InMemorySearchableRepository } from "#seedwork/domain/repository/inMemory.repository";
import { SearchParams, SearchResult } from "#seedwork/domain/repository/repositoryContracts";

type StubEntityProps = {
  title: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps>{

}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['title'];

  protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
    if(!filter) {
      return items;
    }

    return items.filter(item => {
      return (item.props.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.props.price.toString() === filter);
    });
  }
}


describe('InMemorySearchableRepository unit tests', () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => (repository = new StubInMemorySearchableRepository()));

  describe('applyFilter method', () => {
    it('should not filter items when filter is null', async () => {
      const items = [new StubEntity({title: 'title', price: 54})];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      const filteredItems = await repository['applyFilter'](items, null);

      expect(filteredItems).toStrictEqual(items);
      expect(spyFilterMethod).not.toBeCalled();
    })

    it('should filter', async () => {
      const items = [
        new StubEntity({title: 'title', price: 54}),
        new StubEntity({title: 'TITLE', price: 0}),
        new StubEntity({title: 'batatolas', price: 0}),
      ];

      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      let filteredItems = await repository['applyFilter'](items, 'TITLE');

      expect(filteredItems).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      filteredItems = await repository['applyFilter'](items, '54');
      expect(filteredItems).toStrictEqual([items[0]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);
    })
  })

  describe('applySort method', () => {
    it("should not sort items", async () => {
      const items = [
        new StubEntity({title: 'a', price: 10}),
        new StubEntity({title: 'b', price: 0}),
      ]

      let sortedItems = await repository["applySort"](items, null, null);

      expect(JSON.stringify(sortedItems)).toStrictEqual(JSON.stringify(items));
    })

    it("should sort items", async () => {
      const items = [
        new StubEntity({title: "b", price: 8}),
        new StubEntity({title: "a", price: 8}),
        new StubEntity({title: "c", price: 8}),
      ]

      let sortedItems = await repository["applySort"](items, "title", "asc");
      expect(sortedItems).toStrictEqual([items[1], items[0], items[2]]);
      
      sortedItems = await repository["applySort"](items, "title", "desc");
      expect(sortedItems).toStrictEqual([items[2], items[0], items[1]]);
    })
  })

  describe('applyPaginate method',  () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({title: "a", price: 8}),
        new StubEntity({title: "b", price: 8}),
        new StubEntity({title: "c", price: 8}),
        new StubEntity({title: "d", price: 8}),
        new StubEntity({title: "e", price: 8}),
      ]
  
      let paginatedItems = await repository["applyPaginate"](items, 1, 2);
      expect(paginatedItems).toStrictEqual([items[0], items[1]]);

      paginatedItems = await repository["applyPaginate"](items, 2, 2);
      expect(paginatedItems).toStrictEqual([items[2], items[3]]);

      paginatedItems = await repository["applyPaginate"](items, 3, 2);
      expect(paginatedItems).toStrictEqual([items[4]]);

      paginatedItems = await repository["applyPaginate"](items, 4, 2);
      expect(paginatedItems).toStrictEqual([]);
    })
  })

  describe('search method', () => {
    it('should apply only pagination when other param is null', async () => {
      const entity = new StubEntity({title: "a", price: 8});
      repository.items = Array(16).fill(entity);

      const result = await repository.search(new SearchParams());
      expect(result).toStrictEqual(new SearchResult({
        items: Array(15).fill(entity),
        total: 16,
        currentPage: 1,
        perPage: 15,
        sortField: null,
        sort: null,
        filter: null
      }))
    })
  })
})
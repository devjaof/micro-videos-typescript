import CategoryInMemoryRepository from "#category/infra/repository/categoryInMemory.repository";
import ListCategoriesUseCase from "#category/application/useCases/listCategories.useCase"
import CategoryRepository from "#category/domain/repository/category.repository";
import { Category } from "#category/domain/entities/category";

describe("listcategory use case unit tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  })

  test('toOutput method', () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortField: null,
      filter: null
    })
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1
    })

    const entity = new Category({title: 'oi', description: 'eita'});
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortField: null,
      filter: null
    })
    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1
    })
  })

  it('should return output with categories ordered by createdAt', async () => {
    const dateNow = new Date();
    const items = [
      new Category({title: 'test 1', createdAt: dateNow}),
      new Category({title: 'test 2', createdAt: new Date(dateNow.getTime() + 100)}),
      new Category({title: 'test 3', createdAt: new Date(dateNow.getTime() + 200)}),
    ]

    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      items: [...items].reverse().map(i => i.toJSON()),
      total: 3,
      currentPage: 1,
      perPage: 15,
      lastPage: 1
    })
  })

  it('should return output using pagination, sort and filter', async () => {
    const items = [
      new Category({title: 'test'}),
      new Category({title: 'tEst'}),
      new Category({title: 'BBB'}),
      new Category({title: 'bBb'}),
    ]

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
    })
  })
})

import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/notFound.error";
import CategoryInMemoryRepository from "../../../infra/repository/categoryInMemory.repository";
import ListCategoriesUseCase from "../listCategories.useCase"
import CategoryRepository from "category/domain/repository/category.repository";

describe("listcategory use case unit tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  })

  test('toOutpud method', () => {
    const result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortField: null,
      filter: null
    })
  })
})

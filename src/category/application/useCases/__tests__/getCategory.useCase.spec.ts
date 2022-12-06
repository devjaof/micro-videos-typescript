import { Category } from "../../../domain/entities/category";
import NotFoundError from "@seedwork/domain/errors/notFound.error";
import CategoryInMemoryRepository from "../../../infra/repository/categoryInMemory.repository";
import GetCategoryUseCase from "../getCategory.useCase"

describe("getcategory use case unit tests", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  })

  it('should throw error when category not found', async () => {
    expect(async () => {await useCase.execute({id: 'fake id'})})
    .rejects.toThrow(new NotFoundError(`Entity not found using id fake id`))
  })

  it('should get category', async () => {
    const items = [
      new Category({title: 'teste'})
    ]
    repository.items = items;

    const output = await useCase.execute({id: items[0].id});

    expect(output)
    .toStrictEqual({
      id: items[0].id,
      title: 'teste',
      description: null,
      active: true,
      createdAt: items[0].createdAt
    });
  })

})

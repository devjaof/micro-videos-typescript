import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/notFound.error";
import CategoryInMemoryRepository from "../../../infra/repository/categoryInMemory.repository";
import DeleteCategoryUseCase from "../deleteCategory.useCase"
import GetCategoryUseCase from "../getCategory.useCase";

describe("DeleteCategoryUseCase unit tests", () => {
  let deleteUseCase: DeleteCategoryUseCase;
  let getUseCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    deleteUseCase = new DeleteCategoryUseCase(repository);
    getUseCase = new GetCategoryUseCase(repository);
  })

  it('should throw error when category not found', async () => {
    expect(async () => {await deleteUseCase.execute({id: 'fake id'})})
    .rejects.toThrow(new NotFoundError(`Entity not found using id fake id`))
  })

  it('should delete a category', async () => {
    const items = [
      new Category({title: 'teste'})
    ]
    repository.items = items;

    let output = await getUseCase.execute({id: items[0].id});
    expect(output).toStrictEqual({
      id: items[0].id,
      title: 'teste',
      description: null,
      active: true,
      createdAt: items[0].createdAt
    });

    output = await deleteUseCase.execute({id: items[0].id}) as any;
    expect(output).toBeUndefined();
  })
})

import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/notFound.error";
import CategoryInMemoryRepository from "../../../infra/repository/categoryInMemory.repository";
import UpdateCategoryUseCase from "../updateCategory.useCase"

describe("createcategory use case unit tests", () => {
  let updateUseCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    updateUseCase = new UpdateCategoryUseCase(repository);
  })

  it('should throw error when category not found', async () => {
    expect(async () => {await updateUseCase.execute({id: 'fake id', title: 'fake title'})})
    .rejects.toThrow(new NotFoundError(`Entity not found using id fake id`))
  })

  it('should update a category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const category = new Category({title: "filme"});

    repository.items = [category];

    let output = await updateUseCase.execute({id: category.id, title: 'titolo tijolo feijão'});

    expect(spyUpdate).toHaveBeenCalledTimes(1);
  
    expect(output).toStrictEqual ({
      id: repository.items[0].id,
      title: 'titolo tijolo feijão',
      description: null,
      active: true,
      createdAt: repository.items[0].createdAt
    })

    output = await updateUseCase.execute({
      id: category.id,
      title: 'titolo tijolo feijão', 
      description: 'descriptão'
    });
    expect(output).toStrictEqual ({
      id: repository.items[0].id,
      title: 'titolo tijolo feijão',
      description: 'descriptão',
      active: true,
      createdAt: repository.items[0].createdAt
    })

    output = await updateUseCase.execute({
      id: repository.items[0].id,
      title: 'titolo tijolo feijão', 
      description: 'descriptão',
      active: false
    });
    expect(output).toStrictEqual ({
      id: repository.items[0].id,
      title: 'titolo tijolo feijão',
      description: 'descriptão',
      active: false,
      createdAt: repository.items[0].createdAt
    })
  })
})

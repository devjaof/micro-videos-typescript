import CategoryInMemoryRepository from "#category/infra/repository/categoryInMemory.repository";
import { CreateCategoryUseCase } from "#category/application/useCases/createCategory.useCase"

describe("createcategory use case unit tests", () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  })

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({title: 'titolo tijolo feijão'});

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual ({
      id: repository.items[0].id,
      title: 'titolo tijolo feijão',
      description: null,
      active: true,
      createdAt: repository.items[0].createdAt
    })

    output = await useCase.execute({
      title: 'titolo tijolo feijão', 
      description: 'descriptão'
    });
    
    expect(output).toStrictEqual ({
      id: repository.items[1].id,
      title: 'titolo tijolo feijão',
      description: 'descriptão',
      active: true,
      createdAt: repository.items[0].createdAt
    })

    output = await useCase.execute({
      title: 'titolo tijolo feijão', 
      description: 'descriptão',
      active: false
    });

    expect(output).toStrictEqual ({
      id: repository.items[2].id,
      title: 'titolo tijolo feijão',
      description: 'descriptão',
      active: false,
      createdAt: repository.items[0].createdAt
    })
  })
})

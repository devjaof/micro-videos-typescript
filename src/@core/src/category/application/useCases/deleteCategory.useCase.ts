import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";

type Input = {
  id: string;
}

type Output = void;

export class DeleteCategoryUseCase implements UseCaseInterface<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);
    await this.categoryRepository.delete(entity.id);
  }
}

export default DeleteCategoryUseCase;
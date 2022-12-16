import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "#category/application/dtos/categoryOutput";

export namespace UpdateCategoryUseCase {
  export type Input = {
    id: string,
    title: string;
    description?: string;
    active?: boolean;
  }
  
  export class UseCase 
    implements UseCaseInterface<Input, CategoryOutput> {
     constructor(private categoryRepo: CategoryRepository.Repository) {
     }
  
    async execute(input: Input): Promise<CategoryOutput> {
      const entity = await this.categoryRepo.findById(input.id);
      entity.update(input.title, input.description);
  
      if(input.active === true) {
        entity.activate();
      } else if (input.active === false) {
        entity.deactivate();
      }
  
      await this.categoryRepo.update(entity);
  
      return CategoryOutputMapper.toOutput(entity);
    }
  }
}

export default UpdateCategoryUseCase;


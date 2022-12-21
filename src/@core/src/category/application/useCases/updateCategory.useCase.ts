import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dtos/categoryOutput";
import { default as DefaultUseCase } from "../../../@seedwork/application/useCase";

export namespace UpdateCategoryUseCase {
  export type Input = {
    id: string,
    title: string;
    description?: string;
    active?: boolean;
  }

  export type Output = CategoryOutput;
  
  export class UseCase 
    implements DefaultUseCase<Input, Output> {
     constructor(private categoryRepo: CategoryRepository.Repository) {
     }
  
    async execute(input: Input): Promise<Output> {
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


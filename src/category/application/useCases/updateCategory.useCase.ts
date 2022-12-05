import UseCaseInterface from "../../../@seedwork/application/useCase";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dtos/categoryOutput";

type Input = {
  id: string,
  title: string;
  description?: string;
  active?: boolean;
} 

export default class UpdateCategoryUseCase 
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

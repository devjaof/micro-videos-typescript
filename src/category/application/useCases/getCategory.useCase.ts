// Single responsability. Só existe um motivo para mudança neste caso de uso,
// isso não significa ter apenas um método na classe, mas sim, que o método principal só
// será alterado caso a forma de criar uma categoria tbm seja alterada.
// não fazer extends em casos de uso, isso quebra o single responsability

import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "#category/application/dtos/categoryOutput";

// DTO - Data Transfer Objects
type Input = {
  id: string;
} 

export default class GetCategoryUseCase 
  implements UseCaseInterface<Input, CategoryOutput>{
  // dependency injection & dependency inversion
   constructor(private categoryRepo: CategoryRepository.Repository) {
   }

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = await this.categoryRepo.findById(input.id);

    return CategoryOutputMapper.toOutput(entity);
  }
}

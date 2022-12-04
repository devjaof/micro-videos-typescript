// Single responsability. Só existe um motivo para mudança neste caso de uso,
// isso não significa ter apenas um método na classe, mas sim, que o método principal só
// será alterado caso a forma de criar uma categoria tbm seja alterada.
// não fazer extends em casos de uso, isso quebra o single responsability

import UseCaseInterface from "../../../@seedwork/application/useCase";
import { Category } from "../../domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "./dtos/categoryOutput.dto";

// DTO - Data Transfer Objects
type Input = {
  title: string;
  description?: string;
  active?: boolean;
} 

export default class CreateCategoryUseCase 
  implements UseCaseInterface<Input, CategoryOutput> {
  // dependency injection & dependency inversion
   constructor(private categoryRepo: CategoryRepository.Repository) {
   }

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      active: entity.active,
      createdAt: entity.createdAt
    };
  }
}

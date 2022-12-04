// Single responsability. Só existe um motivo para mudança neste caso de uso,
// isso não significa ter apenas um método na classe, mas sim, que o método principal só
// será alterado caso a forma de criar uma categoria tbm seja alterada.
// não fazer extends em casos de uso, isso quebra o single responsability

import { Category } from "../../domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";

// DTO - Data Transfer Objects
type Input = {
  title: string;
  description?: string;
  active?: boolean;
} 
type Output = {
  id: string;
  title: string;
  description: string | null;
  active: boolean;
  createdAt: Date;
}


export default class CreateCategoryUseCase {
  // dependency injection & dependency inversion
   constructor(private categoryRepo: CategoryRepository.Repository) {
   }

  async execute(input: Input): Promise<Output> {
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

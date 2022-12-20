// Single responsability. Só existe um motivo para mudança neste caso de uso,
// isso não significa ter apenas um método na classe, mas sim, que o método principal só
// será alterado caso a forma de criar uma categoria tbm seja alterada.
// não fazer extends em casos de uso, isso quebra o single responsability

import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dtos/categoryOutput";
import {default as DefaultUseCase} from "../../../@seedwork/application/useCase";

export namespace GetCategoryUseCase {
  export type Input = {
    id: string;
  } 

  export type Output = CategoryOutput;
  
  export class UseCase 
    implements DefaultUseCase<Input, Output>{
    // dependency injection & dependency inversion
     constructor(private categoryRepo: CategoryRepository.Repository) {
     }
  
    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
  
      return CategoryOutputMapper.toOutput(entity);
    }
  }
}

export default GetCategoryUseCase;


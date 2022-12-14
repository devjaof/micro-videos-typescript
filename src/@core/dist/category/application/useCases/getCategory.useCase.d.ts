import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "#category/application/dtos/categoryOutput";
export declare namespace GetCategoryUseCase {
    type Input = {
        id: string;
    };
    export class UseCase implements UseCaseInterface<Input, CategoryOutput> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<CategoryOutput>;
    }
    export {};
}
export default GetCategoryUseCase;

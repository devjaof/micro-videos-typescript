import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "#category/application/dtos/categoryOutput";
export declare namespace UpdateCategoryUseCase {
    type Input = {
        id: string;
        title: string;
        description?: string;
        active?: boolean;
    };
    export class UseCase implements UseCaseInterface<Input, CategoryOutput> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<CategoryOutput>;
    }
    export {};
}
export default UpdateCategoryUseCase;

import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "#category/application/dtos/categoryOutput";
export declare namespace CreateCategoryUseCase {
    type Input = {
        title: string;
        description?: string;
        active?: boolean;
    };
    type Output = CategoryOutput;
    export class UseCase implements UseCaseInterface<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    export {};
}
export default CreateCategoryUseCase;

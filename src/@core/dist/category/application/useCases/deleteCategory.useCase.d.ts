import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
export declare namespace DeleteCategoryUseCase {
    type Input = {
        id: string;
    };
    type Output = void;
    export class UseCase implements UseCaseInterface<Input, Output> {
        private categoryRepository;
        constructor(categoryRepository: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    export {};
}
export default DeleteCategoryUseCase;

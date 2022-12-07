import UseCaseInterface from "../../../@seedwork/application/useCase";
import CategoryRepository from "../../domain/repository/category.repository";
type Input = {
    id: string;
};
type Output = void;
export declare class DeleteCategoryUseCase implements UseCaseInterface<Input, Output> {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository.Repository);
    execute(input: Input): Promise<Output>;
}
export default DeleteCategoryUseCase;

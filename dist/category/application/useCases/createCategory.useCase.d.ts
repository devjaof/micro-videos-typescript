import UseCaseInterface from "@seedwork/application/useCase";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dtos/categoryOutput";
type Input = {
    title: string;
    description?: string;
    active?: boolean;
};
export default class CreateCategoryUseCase implements UseCaseInterface<Input, CategoryOutput> {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository.Repository);
    execute(input: Input): Promise<CategoryOutput>;
}
export {};

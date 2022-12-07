import { PaginationOutput } from "@seedwork/application/dtos/paginationOutput";
import { SearchInputDto } from "@seedwork/application/dtos/searchInput";
import UseCaseInterface from "@seedwork/application/useCase";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dtos/categoryOutput";
type Input = SearchInputDto;
type Output = PaginationOutput<CategoryOutput>;
export default class ListCategoriesUseCase implements UseCaseInterface<Input, Output> {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository.Repository);
    execute(input: Input): Promise<Output>;
    private toOutput;
}
export {};

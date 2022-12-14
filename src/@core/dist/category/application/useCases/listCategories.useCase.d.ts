import { PaginationOutput } from "#seedwork/application/dtos/paginationOutput";
import { SearchInputDto } from "#seedwork/application/dtos/searchInput";
import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "#category/application/dtos/categoryOutput";
export declare namespace ListCategoriesUseCase {
    type Input = SearchInputDto;
    type Output = PaginationOutput<CategoryOutput>;
    export class UseCase implements UseCaseInterface<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
    export {};
}
export default ListCategoriesUseCase;

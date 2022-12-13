import { PaginationOutput, PaginationOutputMapper } from "#seedwork/application/dtos/paginationOutput";
import { SearchInputDto } from "#seedwork/application/dtos/searchInput";
import UseCaseInterface from "#seedwork/application/useCase";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "#category/application/dtos/categoryOutput";

export namespace ListCategoriesUseCase {
  // DRY - isto quebra o conceito dont repeat yourself? sim, mas neste caso faz-se
  // necessário esta quebra, já que o uso direto do searchProps faria com que meu
  // caso de uso seja dependente do domínio
  type Input = SearchInputDto;

  type Output = PaginationOutput<CategoryOutput>;

  export class UseCase 
    implements UseCaseInterface<Input, Output>{
    // dependency injection & dependency inversion
    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult = await this.categoryRepo.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      return {
        items: searchResult.items.map((item) => CategoryOutputMapper.toOutput(item)),
        ...PaginationOutputMapper.toOutput(searchResult)
      }
    }
  }
}

export default ListCategoriesUseCase;


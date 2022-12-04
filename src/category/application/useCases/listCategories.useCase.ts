import { SearchInputDto } from "@seedwork/application/dtos/searchInput.dto";
import UseCaseInterface from "../../../@seedwork/application/useCase";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutputDto } from "../dtos/categoryOutput.dto";

// DRY - isto quebra o conceito dont repeat yourself? sim, mas neste caso faz-se
// necessário esta quebra, já que o uso direto do searchProps faria com que meu
// caso de uso seja dependente do domínio
type Input = SearchInputDto;

type Output = {
  items: CategoryOutputDto[],
  total: number,
  currentPage: number,
  perPage: number,
  lastPage: number
};

export default class ListCategoriesUseCase 
  implements UseCaseInterface<Input, Output>{
  // dependency injection & dependency inversion
   constructor(private categoryRepo: CategoryRepository.Repository) {
   }

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);

    return {
      items: searchResult.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        active: item.active,
        createdAt: item.createdAt
      })),
      total: searchResult.total,
      currentPage: searchResult.currentPage,
      perPage: searchResult.perPage,
      lastPage: searchResult.lastPage
    };
  }
}

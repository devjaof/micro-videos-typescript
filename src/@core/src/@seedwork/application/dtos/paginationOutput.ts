import { SearchResult } from "#seedwork/domain/repository/repositoryContracts"

export type PaginationOutput<Items = any> = {
  items: Items[],
  total: number,
  currentPage: number,
  perPage: number,
  lastPage: number
} 

export class PaginationOutputMapper {
  static toOutput(result: SearchResult): 
    Omit<PaginationOutput, "items"> {
    return {
      total: result.total,
      currentPage: result.currentPage,
      perPage: result.perPage,
      lastPage: result.lastPage
    }
  }
}

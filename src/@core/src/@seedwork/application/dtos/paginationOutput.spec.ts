import { SearchResult } from "../../domain/repository/repositoryContracts";
import { PaginationOutputMapper } from "./paginationOutput";

describe('PaginationOutputMapper unit tests', () => {
  it('should convert SearchResult into output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sortField: 'title',
      sort: 'asc',
      filter: 'fake' 

    });

    const output = PaginationOutputMapper.toOutput(result);
    expect(output).toStrictEqual({
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1
    })
  })
})
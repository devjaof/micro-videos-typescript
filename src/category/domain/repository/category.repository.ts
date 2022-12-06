import {
  SearchableRepositoryInterface, 
  SearchParams as defaultSearchParams, 
  SearchResult as defaultSearchResult
} from  '@seedwork/domain/repository/repositoryContracts';
import { Category } from '../entities/category';

export namespace CategoryRepository{  
  export type Filter = string;
  export class SearchParams extends defaultSearchParams<Filter> {
  }
  export class SearchResult extends defaultSearchResult<Category, Filter> {
  }
  export interface Repository 
    extends SearchableRepositoryInterface
    <
      Category, 
      Filter, 
      SearchParams, 
      SearchResult
    > 
    {
     
  }
}

export default CategoryRepository;
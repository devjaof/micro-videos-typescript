import { SearchableRepositoryInterface, SearchParams as defaultSearchParams, SearchResult as defaultSearchResult } from '#seedwork/domain/repository/repositoryContracts';
import { Category } from '#category/domain/entities/category';
export declare namespace CategoryRepository {
    type Filter = string;
    class SearchParams extends defaultSearchParams<Filter> {
    }
    class SearchResult extends defaultSearchResult<Category, Filter> {
    }
    interface Repository extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {
    }
}
export default CategoryRepository;

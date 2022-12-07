import Entity from "../entity/entity";
import UniqueEntityId from "../valueObjects/uniqueEntityIdVo";
export interface RepositoryInterface<E extends Entity> {
    insert(entity: E): Promise<void>;
    findById(id: string | UniqueEntityId): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<void>;
    delete(id: string | UniqueEntityId): Promise<void>;
}
export type SortDirection = "asc" | "desc";
export type SearchProps<Filter = string> = {
    page?: number;
    perPage?: number;
    sortField?: string | null;
    sort?: SortDirection | null;
    filter?: Filter | null;
};
export declare class SearchParams<Filter> {
    protected _page: number;
    protected _perPage: number;
    protected _sortField: string | null;
    protected _sort: SortDirection | null;
    protected _filter: Filter | null;
    constructor(props?: SearchProps<Filter>);
    get page(): number;
    private set page(value);
    get perPage(): number;
    private set perPage(value);
    get sort(): SortDirection | null;
    private set sort(value);
    get sortField(): string | null;
    private set sortField(value);
    get filter(): Filter | null;
    private set filter(value);
}
export type SearchResultProps<E extends Entity, Filter> = {
    items: E[];
    total: number;
    currentPage: number;
    perPage: number;
    sortField: string | null;
    sort: string | null;
    filter: Filter;
};
export declare class SearchResult<E extends Entity = Entity, Filter = string> {
    readonly items: E[];
    readonly total: number;
    readonly currentPage: number;
    readonly perPage: number;
    readonly lastPage: number;
    readonly sortField: string | null;
    readonly sort: string | null;
    readonly filter: Filter | null;
    constructor(props: SearchResultProps<E, Filter>);
    toJSON(): {
        items: E[];
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
        sortField: string;
        sort: string;
        filter: Filter;
    };
}
export interface SearchableRepositoryInterface<E extends Entity, Filter = string, SearchInput = SearchParams<Filter>, SearchOutput = SearchResult<E, Filter>> extends RepositoryInterface<E> {
    sortableFields: string[];
    search(props: SearchInput): Promise<SearchOutput>;
}

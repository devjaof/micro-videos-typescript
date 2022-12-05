import Entity from "../entity/entity";
import UniqueEntityId from "../valueObjects/uniqueEntityIdVo";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

// SeachParams tem o conceito de um objeto de valor, 
// porém não há necessidade de mantê-lo em outro lugar se não aqui
export type SortDirection = "asc" | "desc";
export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sortField?: string | null;
  sort?: SortDirection | null;
  filter?: Filter | null;
}
export class SearchParams<Filter> {
  protected _page: number;
  protected _perPage: number = 15;
  protected _sortField: string | null;
  protected _sort: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProps<Filter> = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sortField = props.sortField;
    this.sort = props.sort;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }
  private set page(value: number) {
    let _page = Number(value);

    if(Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get perPage() {
    return this._perPage;
  }
  private set perPage(value: number) {
    let _perPage = value === true as any ? this._perPage : Number(value);

    if(Number.isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage as any) !== _perPage) {
      _perPage = this._perPage;
    }

    this._perPage = _perPage;
  }

  get sort(): SortDirection | null {
    return this._sort;
  }
  private set sort(value: string | null) {
    if(!this._sortField) {
      this._sort = null;
      return;
    }

    const direction = `${value}`.toLowerCase();
    this._sort = direction !== "asc" && direction !== "desc" ? "desc" : direction;
  }

  get sortField(): string | null {
    return this._sortField;
  }
  private set sortField(value: string | null) {
    this._sortField = 
      value === null || value === undefined || value === "" ? null : `${value}`
  }

  get filter(): Filter | null {
    return this._filter;
  }
  private set filter(value: Filter | null) {
    this._filter = 
      value === null || value === undefined || value === "" ? null : (`${value}` as any) 
  } 
}

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  sortField: string | null;
  sort: string | null;
  filter: Filter;
}
export class SearchResult<E extends Entity = Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sortField: string | null;
  readonly sort: string | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage ? props.perPage : 15;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sortField = props.sortField;
    this.sort = props.sort;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sortField: this.sortField,
      sort: this.sort,
      filter: this.filter
    }
  }
}

export interface SearchableRepositoryInterface
  <
    E extends Entity, 
    Filter = string,
    SearchInput = SearchParams<Filter>, 
    SearchOutput = SearchResult<E, Filter>,
  >
  extends RepositoryInterface<E> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
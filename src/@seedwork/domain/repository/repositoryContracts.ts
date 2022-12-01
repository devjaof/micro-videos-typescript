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
export class SearchParams {
  protected _page: number;
  protected _perPage: number = 15;
  protected _sortField: string | null;
  protected _sort: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps = {}) {
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

  get sort() {
    return this._sort;
  }
  private set sort(value: string | null) {
    if(!this._sort) {
      this._sort = null;
      return;
    }

    const direction = `${value}`.toLowerCase();
    this._sort = direction !== "asc" && direction !== "desc" ? "desc" : direction;
  }

  get sortField() {
    return this._sortField;
  }
  private set sortField(value: string | null) {
    this._sortField = 
      value === null || value === undefined || value === "" ? null : `${value}`
  }

  get filter() {
    return this._filter;
  }
  private set filter(value: string | null) {
    this._filter = 
      value === null || value === undefined || value === "" ? null : `${value}`
  } 
}

export interface SearchableRepositoryInterface<
  E extends Entity, 
  SearchOutput,
  SearchInput = SearchParams, 
  > 
  extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
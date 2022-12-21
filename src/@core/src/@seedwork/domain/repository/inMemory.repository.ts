import Entity from "../entity/entity";
import NotFoundError from "../errors/notFound.error";
import uniqueEntityIdVo from "#seedwork/domain/valueObjects/uniqueEntityIdVo";
import { RepositoryInterface, SearchableRepositoryInterface, SearchParams, SearchResult } from "./repositoryContracts";

export abstract class InMemoryRepository
  <E extends Entity> implements RepositoryInterface <E> {
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | uniqueEntityIdVo): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    
    const index = this.items.findIndex(i => i.id === entity.id);
    this.items[index] = entity;
  }

  async delete(id: string | uniqueEntityIdVo): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);

    const index = this.items.findIndex(i => i.id === _id);
    this.items.splice(index, 1);
  }
  
  
  protected async _get(id: string): Promise<E> {
    const item = this.items.find(item => item.id === id);
    if(!item) {
      throw new NotFoundError(`Entity not found using id ${id}`);
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository
  <E extends Entity> extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E> {
    sortableFields: string[] = []

    async search(props: any): Promise<SearchResult<E, any>> {
      const filteredItems = 
        await this.applyFilter(this.items, props.filter);
      
      const sortedItems = 
        await this.applySort(filteredItems, props.sortField, props.sort);

      const paginatedItems = 
        await this.applyPaginate(sortedItems, props.page, props.perPage);

      return new SearchResult({
        items: paginatedItems,
        total: this.items.length,
        currentPage: props.page,
        perPage: props.perPage,
        sortField: props.sortField,
        sort: props.sort,
        filter: props.filter
      });
    }

    protected abstract applyFilter(
      items: E[], 
      filter: string | null
    ): 
      Promise<E[]>;

    protected async applySort(
      items: E[], 
      sortField: string | null, 
      sort: string | null
    ): 
      Promise<E[]>{
      return [...items].sort((a, b) => {
        if(a.props[sortField] < b.props[sortField]) {
          return sort === "asc" ? -1 : 1;
        }

        if(a.props[sortField] > b.props[sortField]) {
          return sort === "asc" ? 1 : -1;
        }

        return 0;
      })
    };

    protected async applyPaginate(
      items: E[], 
      page: SearchParams<number>['page'], 
      perPage: SearchParams<number>['perPage']
      ): 
      Promise<E[]>{
        const start = (page - 1) * perPage; // 1 * 15 = 15
        const limit = start + perPage; // 15 + 15 = 30
        return items.slice(start, limit)
    };
  }

import Entity from "../entity/entity";
import uniqueEntityIdVo from "../valueObjects/uniqueEntityIdVo";
import { RepositoryInterface, SearchableRepositoryInterface, SearchParams, SearchResult } from "./repositoryContracts";
export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
    items: E[];
    insert(entity: E): Promise<void>;
    findById(id: string | uniqueEntityIdVo): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<void>;
    delete(id: string | uniqueEntityIdVo): Promise<void>;
    protected _get(id: string): Promise<E>;
}
export declare abstract class InMemorySearchableRepository<E extends Entity> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E> {
    sortableFields: string[];
    search(props: any): Promise<SearchResult<E, any>>;
    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;
    protected applySort(items: E[], sortField: string | null, sort: string | null): Promise<E[]>;
    protected applyPaginate(items: E[], page: SearchParams<number>['page'], perPage: SearchParams<number>['perPage']): Promise<E[]>;
}

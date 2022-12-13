import { InMemorySearchableRepository } from "#seedwork/domain/repository/inMemory.repository";
import { Category } from "#category/domain/entities/category";
import CategoryRepository from "#category/domain/repository/category.repository";
export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
    protected applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]>;
    protected applySort(items: Category[], sortField: string, sort: string): Promise<Category[]>;
}

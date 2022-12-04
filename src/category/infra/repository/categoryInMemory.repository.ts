import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/inMemory.repository";
import { Category } from "category/domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";

export default class CategoryInMemoryRepository 
  extends InMemorySearchableRepository<Category> 
  implements CategoryRepository.Repository{
    protected async applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]> {
      if(!filter) {
        return items;
      }
  
      return items.filter(item => {
        return item.props.title.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(items: Category[], sortField: string, sort: string): Promise<Category[]> {
      if(!sortField) {
        sortField = 'createdAt';
      }

      return !sort ? super.applySort(items, sortField, 'desc') : super.applySort(items, sortField, sort);
    }
}
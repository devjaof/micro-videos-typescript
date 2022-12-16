import { ListCategoriesUseCase } from '@jfr/micro-videos/category/application';
import { SortDirection } from '@jfr/micro-videos/@seedwork/domain';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: string;
  perPage?: number;
  sortField?: string;
  sort: SortDirection;
}

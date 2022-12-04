import { SortDirection } from "@seedwork/domain/repository/repositoryContracts";

export type SearchInputDto<Filter = string> = {
  page?: number;
  perPage?: number;
  sortField?: string | null;
  sort?: SortDirection | null;
  filter?: Filter | null;
} 

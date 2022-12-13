import { SearchResult } from "#seedwork/domain/repository/repositoryContracts";
export type PaginationOutput<Items = any> = {
    items: Items[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
};
export declare class PaginationOutputMapper {
    static toOutput(result: SearchResult): Omit<PaginationOutput, "items">;
}

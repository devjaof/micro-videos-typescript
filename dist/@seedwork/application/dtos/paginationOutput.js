"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationOutputMapper = void 0;
class PaginationOutputMapper {
    static toOutput(result) {
        return {
            total: result.total,
            currentPage: result.currentPage,
            perPage: result.perPage,
            lastPage: result.lastPage
        };
    }
}
exports.PaginationOutputMapper = PaginationOutputMapper;

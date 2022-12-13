"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inMemory_repository_1 = require("#seedwork/domain/repository/inMemory.repository");
class CategoryInMemoryRepository extends inMemory_repository_1.InMemorySearchableRepository {
    async applyFilter(items, filter) {
        if (!filter) {
            return items;
        }
        return items.filter(item => {
            return item.props.title.toLowerCase().includes(filter.toLowerCase());
        });
    }
    async applySort(items, sortField, sort) {
        if (!sortField) {
            sortField = 'createdAt';
        }
        return !sort ? super.applySort(items, sortField, 'desc') : super.applySort(items, sortField, sort);
    }
}
exports.default = CategoryInMemoryRepository;

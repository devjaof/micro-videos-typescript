"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchableRepository = void 0;
const notFound_error_1 = require("#seedwork/domain/errors/notFound.error");
const repositoryContracts_1 = require("./repositoryContracts");
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async insert(entity) {
        this.items.push(entity);
    }
    async findById(id) {
        const _id = `${id}`;
        return this._get(_id);
    }
    async findAll() {
        return this.items;
    }
    async update(entity) {
        await this._get(entity.id);
        const index = this.items.findIndex(i => i.id === entity.id);
        this.items[index] = entity;
    }
    async delete(id) {
        const _id = `${id}`;
        await this._get(_id);
        const index = this.items.findIndex(i => i.id === _id);
        this.items.splice(index, 1);
    }
    async _get(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new notFound_error_1.default(`Entity not found using id ${id}`);
        }
        return item;
    }
}
exports.default = InMemoryRepository;
class InMemorySearchableRepository extends InMemoryRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = [];
    }
    async search(props) {
        const filteredItems = await this.applyFilter(this.items, props.filter);
        const sortedItems = await this.applySort(filteredItems, props.sortField, props.sort);
        const paginatedItems = await this.applyPaginate(sortedItems, props.page, props.perPage);
        return new repositoryContracts_1.SearchResult({
            items: paginatedItems,
            total: this.items.length,
            currentPage: props.page,
            perPage: props.perPage,
            sortField: props.sortField,
            sort: props.sort,
            filter: props.filter
        });
    }
    async applySort(items, sortField, sort) {
        return [...items].sort((a, b) => {
            if (a.props[sortField] < b.props[sortField]) {
                return sort === "asc" ? -1 : 1;
            }
            if (a.props[sortField] > b.props[sortField]) {
                return sort === "asc" ? 1 : -1;
            }
            return 0;
        });
    }
    ;
    async applyPaginate(items, page, perPage) {
        const start = (page - 1) * perPage;
        const limit = start + perPage;
        return items.slice(start, limit);
    }
    ;
}
exports.InMemorySearchableRepository = InMemorySearchableRepository;

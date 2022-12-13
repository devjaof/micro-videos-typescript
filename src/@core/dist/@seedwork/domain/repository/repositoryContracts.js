"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = exports.SearchParams = void 0;
class SearchParams {
    constructor(props = {}) {
        this._perPage = 15;
        this.page = props.page;
        this.perPage = props.perPage;
        this.sortField = props.sortField;
        this.sort = props.sort;
        this.filter = props.filter;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        let _page = Number(value);
        if (Number.isNaN(_page) || _page <= 0 || parseInt(_page) !== _page) {
            _page = 1;
        }
        this._page = _page;
    }
    get perPage() {
        return this._perPage;
    }
    set perPage(value) {
        let _perPage = value === true ? this._perPage : Number(value);
        if (Number.isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage) !== _perPage) {
            _perPage = this._perPage;
        }
        this._perPage = _perPage;
    }
    get sort() {
        return this._sort;
    }
    set sort(value) {
        if (!this._sortField) {
            this._sort = null;
            return;
        }
        const direction = `${value}`.toLowerCase();
        this._sort = direction !== "asc" && direction !== "desc" ? "desc" : direction;
    }
    get sortField() {
        return this._sortField;
    }
    set sortField(value) {
        this._sortField =
            value === null || value === undefined || value === "" ? null : `${value}`;
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter =
            value === null || value === undefined || value === "" ? null : `${value}`;
    }
}
exports.SearchParams = SearchParams;
class SearchResult {
    constructor(props) {
        this.items = props.items;
        this.total = props.total;
        this.currentPage = props.currentPage;
        this.perPage = props.perPage ? props.perPage : 15;
        this.lastPage = Math.ceil(this.total / this.perPage);
        this.sortField = props.sortField;
        this.sort = props.sort;
        this.filter = props.filter;
    }
    toJSON() {
        return {
            items: this.items,
            total: this.total,
            currentPage: this.currentPage,
            perPage: this.perPage,
            lastPage: this.lastPage,
            sortField: this.sortField,
            sort: this.sort,
            filter: this.filter
        };
    }
}
exports.SearchResult = SearchResult;

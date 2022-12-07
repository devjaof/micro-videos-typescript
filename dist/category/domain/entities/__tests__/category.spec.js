"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../category");
const uniqueEntityIdVo_1 = require("@seedwork/domain/valueObjects/uniqueEntityIdVo");
describe("Category Tests", () => {
    beforeEach(() => {
        category_1.Category.validate = jest.fn();
    });
    test("category with only non mandatory props and the description", () => {
        const date = new Date();
        const category = new category_1.Category({
            title: 'another category title',
            description: 'another category description'
        });
        expect(category.props).toStrictEqual({
            title: 'another category title',
            description: 'another category description',
            active: true,
            createdAt: date
        });
        expect(category_1.Category.validate).toHaveBeenCalled();
    });
    test("category with non mandatory props and omitting the date", () => {
        const now = new Date();
        const category = new category_1.Category({
            title: 'another category title'
        });
        const { createdAt } = category, dateOmitted = __rest(category, ["createdAt"]);
        expect(dateOmitted.props).toStrictEqual({
            title: 'another category title',
            description: null,
            active: true,
            createdAt: now
        });
        expect(category_1.Category.validate).toHaveBeenCalled();
    });
    test("id field validations", () => {
        const data = [
            { props: { title: "Movie" } },
            { props: { title: "Movie" }, id: new uniqueEntityIdVo_1.default() },
        ];
        data.forEach((item) => {
            const category = new category_1.Category(item.props, item.id);
            expect(category.id).not.toBeNull();
            expect(category.UniqueEntityId).toBeInstanceOf(uniqueEntityIdVo_1.default);
        });
    });
});
describe("Getters and Setters", () => {
    it("should get and set title", () => {
        const category = new category_1.Category({ title: 'Documentário' });
        expect(category.title).toBe('Documentário');
        category["title"] = 'Filmes';
        expect(category.title).toBe('Filmes');
    });
    it("should get and set description", () => {
        const category = new category_1.Category({ title: 'Filmes', description: 'Longas metragens' });
        expect(category.description).toBe('Longas metragens');
        category["description"] = 'Jamelão';
        expect(category.description).toBe('Jamelão');
    });
    it('should update a category', () => {
        const category = new category_1.Category({ title: 'Animões', description: 'japonesos' });
        category.update('Animes', 'Animações japonesas TOP');
        expect(category.title).toBe('Animes');
        expect(category.description).toBe('Animações japonesas TOP');
        expect(category_1.Category.validate).toHaveBeenCalledTimes(2);
    });
    it("should activate and deactivate category", () => {
        const category = new category_1.Category({ title: 'Animões', description: 'japonesos', active: false });
        category.activate();
        expect(category.active).toBeTruthy();
        category.deactivate();
        expect(category.active).toBeFalsy();
    });
});

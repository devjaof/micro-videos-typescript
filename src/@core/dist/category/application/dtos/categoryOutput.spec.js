"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const categoryOutput_1 = require("./categoryOutput");
describe('CategoryOutputMapper unit tests', () => {
    it('should convert category into output', () => {
        const dateNow = new Date();
        const entity = new category_1.Category({
            title: 'teste',
            description: 'aaaaalguma coisinha',
            active: true,
            createdAt: dateNow
        });
        const spyToJson = jest.spyOn(entity, 'toJSON');
        const output = categoryOutput_1.CategoryOutputMapper.toOutput(entity);
        expect(spyToJson).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: entity.id,
            title: 'teste',
            description: 'aaaaalguma coisinha',
            active: true,
            createdAt: dateNow
        });
    });
});

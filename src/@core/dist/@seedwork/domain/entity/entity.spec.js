"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueEntityIdVo_1 = require("#seedwork/domain/valueObjects/uniqueEntityIdVo");
const entity_1 = require("./entity");
const uuid_1 = require("uuid");
class StubEntity extends entity_1.default {
}
;
describe("Entity Unit Tests", () => {
    it('should set props and id', () => {
        const arrange = { prop: 'teletubbies', prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.UniqueEntityId).toBeInstanceOf(uniqueEntityIdVo_1.default);
        expect(entity.id).not.toBeNull();
        expect((0, uuid_1.validate)(entity.id)).toBeTruthy();
    });
    it('should accept valid uuid', () => {
        const arrange = { prop: 'teletubbies', prop2: 10 };
        const uniqueEntityId = new uniqueEntityIdVo_1.default();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });
    it('should convert entity to JS object', () => {
        const arrange = { prop: 'teletubbies', prop2: 10 };
        const uniqueEntityId = new uniqueEntityIdVo_1.default();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id }, arrange));
    });
});

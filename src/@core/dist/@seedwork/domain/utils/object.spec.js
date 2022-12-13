"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
describe('object util unit tests', () => {
    it('should not freeze a scalar (single value of unit of data) value', () => {
        const str = (0, object_1.deepFreeze)('a');
        expect(typeof str).toBe('string');
        const boolean = (0, object_1.deepFreeze)(true);
        expect(typeof boolean).toBe('boolean');
        const number = (0, object_1.deepFreeze)(2);
        expect(typeof number).toBe('number');
    });
    it('should freeze (immutable) a object', () => {
        const obj = (0, object_1.deepFreeze)({ prop: 'bananoca', nested: { prop2: 'bananuca', prop3: new Date() } });
        expect(() => {
            obj.prop = 'batatoca';
        }).toThrow("Cannot assign to read only property 'prop' of object '#<Object>'");
        expect(() => {
            obj.nested.prop2 = 'batatuca';
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(obj.nested.prop3).toBeInstanceOf(Date);
    });
});

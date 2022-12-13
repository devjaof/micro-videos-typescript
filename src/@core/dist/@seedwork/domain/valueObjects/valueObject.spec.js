"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valueObject_1 = require("./valueObject");
class StubValueObject extends valueObject_1.default {
}
;
describe('Value Object Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('banana');
        expect(vo.value).toBe('banana');
        vo = new StubValueObject({ prop: 'batata' });
        expect(vo.value).toStrictEqual({ prop: 'batata' });
    });
    it('should convert value to string', () => {
        const date = new Date();
        let arrange = [
            { received: "", expected: "" },
            { received: "batata", expected: "batata" },
            { received: 3, expected: "3" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            {
                received: { prop: 'bananinha' },
                expected: JSON.stringify({ prop: 'bananinha' })
            }
        ];
        arrange.forEach((value) => {
            const vo = new StubValueObject(value.received);
            expect(`${vo}`).toBe(value.expected);
        });
    });
    it('should be immutable', () => {
        const obj = {
            prop: 'derby solto',
            nested: { prop2: 'camelinho', prop3: new Date() }
        };
        const vo = new StubValueObject(obj);
        expect(() => {
            vo.value.prop = 'bar do pimbas';
        }).toThrow("Cannot assign to read only property 'prop' of object '#<Object>'");
        expect(() => {
            vo.value.nested.prop2 = 'bar do pimbas';
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(() => {
            vo.value.nested.prop3 = 'bar do pimbas';
        }).toThrow("Cannot assign to read only property 'prop3' of object '#<Object>'");
        expect(() => {
            vo.value.nested.prop4 = 'bar do pimbas';
        }).toThrow("Cannot add property prop4, object is not extensible");
    });
});

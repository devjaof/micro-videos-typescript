import { deepFreeze } from "./object"

describe('object util unit tests', () => {
  it('should not freeze a scalar (single value of unit of data) value', () => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string');

    const boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');

    const number = deepFreeze(2);
    expect(typeof number).toBe('number');
  })

  it('should freeze (immutable) a object', () => {
    const obj = deepFreeze({prop: 'bananoca', nested: {prop2: 'bananuca', prop3: new Date()}});

    expect(() => {
      (obj as any).prop = 'batatoca';
    }).toThrow(
      "Cannot assign to read only property 'prop' of object '#<Object>'"
    )

    expect(() => {
      (obj as any).nested.prop2 = 'batatuca';
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    )

    expect(obj.nested.prop3).toBeInstanceOf(Date);
  })
})
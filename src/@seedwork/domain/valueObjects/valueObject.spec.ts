// mock: instancia fake
// stub: dublê de teste 

import ValueObject from "./valueObject";

class StubValueObject extends ValueObject {};

describe('Value Object Unit Tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('banana');
    expect(vo.value).toBe('banana');

    vo = new StubValueObject({prop: 'batata'});
    expect(vo.value).toStrictEqual({prop: 'batata'});
  })

  it('should convert value to string', () => {
    const date = new Date();
    let arrange: any = [
      {received: "", expected: ""}, 
      {received: "batata", expected: "batata"}, 
      {received: 3, expected: "3"}, 
      {received: true, expected: "true"}, 
      {received: false, expected: "false"}, 
      {received: date, expected: date.toString()}, 
      {
        received: {prop: 'bananinha'},
        expected: JSON.stringify({prop: 'bananinha'})
      }
    ];

    arrange.forEach((value: any) => {
      const vo: any = new StubValueObject(value.received);

      expect(`${vo}`).toBe(value.expected);
    })
  })

  it('should be immutable', () => {
    const obj = {
      prop: 'derby solto',
      nested: {prop2: 'camelinho', prop3: new Date()}
    }

    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value.prop = 'bar do pimbas';
    }).toThrow(
      "Cannot assign to read only property 'prop' of object '#<Object>'"
    )

    expect(() => {
      (vo as any).value.nested.prop2 = 'bar do pimbas';
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    )

    expect(() => {
      (vo as any).value.nested.prop3 = 'bar do pimbas';
    }).toThrow(
      "Cannot assign to read only property 'prop3' of object '#<Object>'"
    )

    expect(() => {
      (vo as any).value.nested.prop4 = 'bar do pimbas';
    }).toThrow(
      "Cannot add property prop4, object is not extensible"
    )
  })
})

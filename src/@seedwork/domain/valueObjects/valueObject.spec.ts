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
      {received: null, expected: "null"}, 
      {received: undefined, expected: "undefined"},
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
})
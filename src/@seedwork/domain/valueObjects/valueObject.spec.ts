// mock: instancia fake
// stub: dublê de teste 

import ValueObject from "./valueObject";

class StubValueObject extends ValueObject {

}

describe('Value Object Unit Tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('banana');
    expect(vo.value).toBe('banana');

    vo = new StubValueObject({prop: 'batata'});
    expect(vo.value).toStrictEqual({prop: 'batata'});
  })
})
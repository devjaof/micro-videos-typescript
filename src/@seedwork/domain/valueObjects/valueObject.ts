// objetos de valor são sempre imutáveis!

import { deepFreeze } from "#seedwork/domain/utils/object";
export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;
 
  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if(typeof this.value !== "object" || this.value === null){
      try {
        return this.value.toString();
      } catch (error) {
        return this.value + "";
      }
    }

    const stringValue =  this.value.toString();

    return stringValue === "[object Object]" ? JSON.stringify(this.value) : stringValue;
  }
}
// VO -> Value Object
import InvalidUuidError from '../errors/invalidUuid.error';
import { v4 as uuid, validate as uuidValidate } from 'uuid';
import ValueObject from './valueObject';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuid());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);

    if(!isValid) {
      throw new InvalidUuidError();
    }
  }
}

export default UniqueEntityId;
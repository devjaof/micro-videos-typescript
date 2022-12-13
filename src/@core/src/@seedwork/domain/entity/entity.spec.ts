import UniqueEntityId from "#seedwork/domain/valueObjects/uniqueEntityIdVo";
import Entity from "./entity"
import { validate } from 'uuid';

class StubEntity extends Entity<{prop: string; prop2: number}> {};

describe("Entity Unit Tests", () => {
  it('should set props and id', () => {
    const arrange = {prop: 'teletubbies', prop2: 10};
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.UniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(validate(entity.id)).toBeTruthy();
  })

  it('should accept valid uuid', () => {
    const arrange = {prop: 'teletubbies', prop2: 10};
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.id).toBe(uniqueEntityId.value);
  })

  it('should convert entity to JS object', () => {
    const arrange = {prop: 'teletubbies', prop2: 10};
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange
    })
  })
})
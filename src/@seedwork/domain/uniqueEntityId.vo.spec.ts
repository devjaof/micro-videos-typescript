import { validate } from "uuid";
import InvalidUuidError from "../../@seedwork/errors/invalidUuid.error";
import UniqueEntityId from "./uniqueEntityIdVo";

describe("UniqueEntityId unity tests", () => {
  it('should throw an InvalidUuidError when uuid is invalid', () => {
    const spyOnValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
  
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(spyOnValidate).toHaveBeenCalled();
  })

  it('should accept a validated uuid passed in constructor', () => {
    const spyOnValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    // vo -> value object
    const vo = new UniqueEntityId('258d4d87-c57d-4ec5-81d9-6fbb9fc73929');
    expect(vo.id).toBe('258d4d87-c57d-4ec5-81d9-6fbb9fc73929');

    expect(spyOnValidate).toHaveBeenCalled();
  })

  it('should accept a validated not implicit uuid ', () => {
    const spyOnValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    // vo -> value object
    const vo = new UniqueEntityId();
    expect(validate(vo.id)).toBeTruthy();

    expect(spyOnValidate).toHaveBeenCalled();
  })
});
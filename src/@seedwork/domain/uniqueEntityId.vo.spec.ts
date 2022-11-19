import InvalidUuidError from "../../@seedwork/errors/invalidUuid.error";
import UniqueEntityId from "./uniqueEntityIdVo";

describe("UniqueEntityId unity tests", () => {
  it('should throw an InvalidUuidError when uuid is invalid', () => {
    const spyOnValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
  
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(spyOnValidate).toHaveBeenCalled();
  })
}); 
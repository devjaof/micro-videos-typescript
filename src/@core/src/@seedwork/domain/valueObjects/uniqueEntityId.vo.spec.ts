import { validate } from "uuid";
import InvalidUuidError from "#seedwork/domain/errors/invalidUuid.error";
import UniqueEntityId from "./uniqueEntityIdVo";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe("UniqueEntityId unity tests", () => {
  const spyOnValidate = spyValidateMethod();

  // beforeEach(() => {
    // jest.clearAllMocks();
  // });


  it('should throw an InvalidUuidError when uuid is invalid', () => {
    // const spyOnValidate = spyValidateMethod()
  
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(spyOnValidate).toHaveBeenCalled();
  })

  it('should accept a validated uuid passed in constructor', () => {
    // const spyOnValidate = spyValidateMethod()

    // vo -> value object
    const vo = new UniqueEntityId('258d4d87-c57d-4ec5-81d9-6fbb9fc73929');
    expect(vo.value).toBe('258d4d87-c57d-4ec5-81d9-6fbb9fc73929');

    expect(spyOnValidate).toHaveBeenCalled();
  })

  it('should accept a validated not implicit uuid ', () => {
    // const spyOnValidate = spyValidateMethod()

    // vo -> value object
    const vo = new UniqueEntityId();
    expect(validate(vo.value)).toBeTruthy();

    expect(spyOnValidate).toHaveBeenCalled();
  })
});
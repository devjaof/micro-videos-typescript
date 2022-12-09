import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import ClassValidatorFields from "#seedwork/domain/validators/classValidatorFields"

class StubRules {
  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidator extends ClassValidatorFields<{field: string}> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
};

describe('ClassValidatorFields integration tests', () => {
  it('should validate with errors', () => {
    const validator = new StubClassValidator();

    expect(validator.validate(null)).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      title: [
        'title should not be empty',
        'title must be a string',
        'title must be shorter than or equal to 256 characters'
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints'
      ]
    });
  });

  it('should be valid', () => {
    const validator = new StubClassValidator();

    expect(validator.validate({title: 'Frip Frep iogurte', price: 22})).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new StubRules({title: 'Frip Frep iogurte', price: 22}));
  })
})
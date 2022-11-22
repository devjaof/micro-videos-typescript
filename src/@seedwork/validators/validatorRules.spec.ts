import ValidationError from "../../@seedwork/errors/validation.error";
import ValidatorRules from "./validatorRules"

type Values = {
  value: any;
  property: string;
}

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any;
}

function assertIsInvalid({
  value, 
  property, 
  rule, 
  error, 
  params = [],
}: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, ...params)

  }).toThrow(error);
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('Drama', 'Category');
    expect(validator).toBeInstanceOf(ValidatorRules);

    expect(validator['value']).toBe('Drama');
    expect(validator['property']).toBe('Category');
  })

  it('should throw error when required rule is violeted', () => {
    const arrange: Values[] = [
      {value: '', property: 'Category',},
      {value: null, property: 'Category'},
      {value: undefined, property: 'Category'},
      {value: 0, property: 'Category'},
    ]

    arrange.forEach((item: Values) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError(`The ${item.property} is required.`)
      })
    })
  })

  it('should throw error when value isnt a string', () => {
    const arrange: Values[] = [
      {value: 5, property: 'Category'},
      {value: {maluco: 'sim'}, property: 'Category'},
      {value: true, property: 'Category'},
    ];

    arrange.forEach((item: Values) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError(`The ${item.property} must be a string.`)
      })
    })
  })

  it('should throw error when value max length > 255', () => {
    const arrange: Values[] = [
      {value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', property: 'Category'},
    ] 

    arrange.forEach((item: Values) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: new ValidationError(`The ${item.property} is over the max-length.`),
        params: 250
      })
    })
  })
}) 

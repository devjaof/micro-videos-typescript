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
    const method: any = validator[rule];
    method.apply(validator, params)

  }).toThrow(error);
}

function assertIsValid({
  value, 
  property, 
  rule, 
  error, 
  params = [],
}: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method: any = validator[rule];
    method.apply(validator, params)

  }).not.toThrow(error);
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('Drama', 'Category');
    expect(validator).toBeInstanceOf(ValidatorRules);

    expect(validator['value']).toBe('Drama');
    expect(validator['property']).toBe('Category');
  })

  // not valid tests
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
      {value: new Date, property: 'Category'},
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

  it('should throw error when value is over the max-length rule', () => {
    const arrange: Values[] = [
      {value: 'aadssaaaasdasdasad', property: 'Category'},
    ] 

    arrange.forEach((item: Values) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: new ValidationError(`The ${item.property} is over the max-length.`),
        params: [10]
      })
    })
  })

  it('should throw error when value is not a boolean', () => {
    const arrange: Values[] = [
      {value: 'true', property: 'active'},
      {value: 5, property: 'active'},
      {value: new Date, property: 'active'}
    ] 

    arrange.forEach((item: Values) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error: new ValidationError(`The ${item.property} must be a boolean`)
      })
    })
  })

  // valid tests
  it('should not throw required rule error', () => {
    const arrange: Values[] = [
      {value: 'Filme', property: 'Category',}
    ]

    arrange.forEach((item: Values) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError(`The ${item.property} is required.`)
      })
    })
  })

  it('should not throw string rule error', () => {
    const arrange: Values[] = [
      {value: 'Filme', property: 'Category'},
      {value: undefined, property: 'Category'},
      {value: null, property: 'Category'},
    ]

    arrange.forEach((item: Values) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError(`The ${item.property} must be a string.`)
      })
    })
  })

  it('should not throw maxLength rule error', () => {
    const arrange: Values[] = [
      {value: 'Filme', property: 'Category'},
      {value: undefined, property: 'Category'},
      {value: null, property: 'Category'},
    ]

    arrange.forEach((item: Values) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: new ValidationError(`The ${item.property} is over the maxLength of 10.`),
        params: [10]
      })
    })
  })

  it('should not throw boolean rule error', () => {
    const arrange: Values[] = [
      {value: true, property: 'active'},
      {value: null, property: 'active'},
      {value: undefined, property: 'active'}
    ]

    arrange.forEach((item: Values) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error: new ValidationError(`The ${item.property} must be a boolean`),
      })
    })
  })
}) 

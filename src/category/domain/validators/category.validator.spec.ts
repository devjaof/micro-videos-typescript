import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from "./category.validator"

describe('CategoryValidator tests', () => {
  let validator: CategoryValidator;

  beforeEach(() => (validator = CategoryValidatorFactory.create()));
  test('invalidation cases for title field', () => {
    const arrange = [
      {isValid: validator.validate({title: null}), data: null as any},
      {isValid: validator.validate({title: undefined}), data: undefined as any},
      {isValid: validator.validate({title: ''}), data: ''},
      {isValid: validator.validate({title: 5 as any}), data: 5 as any},
      {isValid: validator.validate({title: "teste".repeat(256)}), data: "teste".repeat(256)},
    ];

    arrange.forEach((each) => {
      expect(each.isValid).toBeFalsy();
      expect({validator, data: each.data}).toContainErrorMessages({
        title: [
          'title should not be empty',
          'title must be a string',
          'title must be shorter than or equal to 256 characters'
        ]
      })
    })
  })

  test('validation cases', () => {
    const arrange = [
      {isValid: validator.validate({title: "Filmes"}), data: "Filmes"},
    ];

    arrange.forEach((each) => {
      expect(each.isValid).toBeTruthy();
    })
  })
})
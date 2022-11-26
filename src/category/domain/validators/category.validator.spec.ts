import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from "./category.validator"

describe('CategoryValidator tests', () => {
  let validator: CategoryValidator;

  beforeEach(() => (validator = CategoryValidatorFactory.create()));
  test('invalidation cases for title field', () => {
    let isValid = validator.validate({title: null});
    expect(isValid).toBeFalsy();
    expect(validator.errors['title']).toStrictEqual(
      [
        'title should not be empty',
        'title must be a string',
        'title must be shorter than or equal to 256 characters'
      ],
    )

    isValid = validator.validate({title: ""});
    expect(isValid).toBeFalsy();
    expect(validator.errors['title']).toStrictEqual(
      [
        'title should not be empty',
      ],
    )

    isValid = validator.validate({title: 5 as any});
    expect(isValid).toBeFalsy();
    expect(validator.errors['title']).toStrictEqual(
      [
        'title must be a string',
        'title must be shorter than or equal to 256 characters'
      ],
    )

    isValid = validator.validate({title: "teste".repeat(256)});
    expect(isValid).toBeFalsy();
    expect(validator.errors['title']).toStrictEqual(
      [
        'title must be shorter than or equal to 256 characters'
      ],
    )
  })

  test('validation cases', () => {
    expect(validator.validate({title: "Filmes"})).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules({title: "Filmes"}));

    expect(validator.validate({title: "Filmes", description: undefined})).toBeTruthy();
    expect(validator.validate({title: "Filmes", description: null})).toBeTruthy();
    expect(validator.validate({title: "Filmes", active: true})).toBeTruthy();
    expect(validator.validate({title: "Filmes", active: false})).toBeTruthy();
  })

})
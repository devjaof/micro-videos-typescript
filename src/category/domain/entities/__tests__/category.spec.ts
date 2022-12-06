import { Category, CategoryProperties } from '../category';
import UniqueEntityId from '@seedwork/domain/valueObjects/uniqueEntityIdVo';

describe("Category Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  })
  test("category with only non mandatory props and the description", () => {

    const date = new Date();
    const category = new Category({
      title: 'another category title',
      description: 'another category description'
    });

    expect(category.props).toStrictEqual({
      title: 'another category title',
      description: 'another category description',
      active: true,
      createdAt: date
    });
    
    expect(Category.validate).toHaveBeenCalled();
  })

  test("category with non mandatory props and omitting the date", () => {
    const now = new Date();
    const category = new Category({
      title: 'another category title'
    });

    const {createdAt, ...dateOmitted} = category;

    expect(dateOmitted.props).toStrictEqual({
      title: 'another category title',
      description: null,
      active: true,
      createdAt: now
    });
    expect(Category.validate).toHaveBeenCalled();

  })

  test("id field validations", () => {
    type CategoryData = {props: CategoryProperties, id?: UniqueEntityId}

    const data: CategoryData[] = [
      {props: {title: "Movie"} },
      {props: {title: "Movie"}, id: new UniqueEntityId()},
    ];

    data.forEach((item) => {
      const category = new Category(item.props, item.id);

      expect(category.id).not.toBeNull();
      expect(category.UniqueEntityId).toBeInstanceOf(UniqueEntityId);
    })
  })
});

describe("Getters and Setters", () => {
  it("should get and set title", () => {
    const category = new Category({title: 'Documentário'});
    expect(category.title).toBe('Documentário');

    category["title"] = 'Filmes';
    expect(category.title).toBe('Filmes');
  })

  it("should get and set description", () => {
    const category = new Category({title: 'Filmes', description: 'Longas metragens'});
    expect(category.description).toBe('Longas metragens');
    
    category["description"] = 'Jamelão';
    expect(category.description).toBe('Jamelão');
  })

  it('should update a category', () => {
    const category = new Category({title: 'Animões', description: 'japonesos'});
    category.update('Animes', 'Animações japonesas TOP');

    expect(category.title).toBe('Animes');
    expect(category.description).toBe('Animações japonesas TOP');

    expect(Category.validate).toHaveBeenCalledTimes(2);

  })

  it("should activate and deactivate category", () => {
    const category = new Category({title: 'Animões', description: 'japonesos', active: false});

    category.activate();
    expect(category.active).toBeTruthy();

    category.deactivate();
    expect(category.active).toBeFalsy();
  })
})

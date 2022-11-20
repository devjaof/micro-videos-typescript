import { Category, CategoryProperties } from './category';
import UniqueEntityId from '../../../@seedwork/domain/valueObjects/uniqueEntityIdVo';

describe("Category Tests", () => {
  beforeAll(() => {
    jest.useFakeTimers()
    .setSystemTime(new Date('19 Nov 2022 05:00:00 GMT').getTime());
  });

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
  })

  test("id field validations", () => {
    type CategoryData = {props: CategoryProperties, id?: UniqueEntityId}

    const data: CategoryData[] = [
      {props: {title: "Movie"} },
      {props: {title: "Movie"}, id: null},
      {props: {title: "Movie"}, id: undefined},
      {props: {title: "Movie"}, id: new UniqueEntityId()},
    ];

    data.forEach((item) => {
      const category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    })
  })
});

describe("Getters and Setters", () => {
  test("is getting the title?", () => {
    const now = new Date();

    const category = new Category({
      title: 'another category title',
      active: false,
      createdAt: now,
    });

    expect(category.title).toBe('another category title');
  })

  test("is getting the description?", () => {
    const now = new Date();

    const category = new Category({
      title: 'another category title',
      description: 'another category description',
      active: false,
      createdAt: now,
    });

    expect(category.description).toBe('another category description');
  })

  test("is getting active property?", () => {
    const now = new Date();

    const category = new Category({
      title: 'another category title',
      description: 'another category description',
      active: false,
      createdAt: now,
    });

    expect(category.active).toBeFalsy();
  })

  test("is getting createdAt property?", () => {
    const now = new Date();

    const category = new Category({
      title: 'another category title',
      description: 'another category description',
      active: false,
      createdAt: now,
    });

    expect(category.createdAt).toBe(now);
  })

  test("is setting description property?", () => {
    const now = new Date();

    let category = new Category({
      title: 'another category title',
      description: 'another category description',
      active: false,
      createdAt: now,
    });

    category["description"] = null;
    expect(category.description).toBe(null);
  })
  
  test("is setting the active property?", () => {
    const now = new Date();

    let category = new Category({
      title: 'another category title',
      description: 'another category description',
      active: false,
      createdAt: now,
    });

    category["active"] = true;
    expect(category.active).toBeTruthy();
  })
})

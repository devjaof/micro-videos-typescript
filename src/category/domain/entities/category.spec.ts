import { Category } from './category';

describe("Category Unit Tests", ():void => {
  test("category with only non mandatory props", () => {
    const now = new Date();
    const category = new Category({
      title: 'category title'
    });

    expect(category.props).toStrictEqual({
      title: 'category title',
      description: null,
      active: true,
      createdAt: now
    });
  })

  test("category with only non mandatory props and the description", () => {
    const now = new Date();
    const category = new Category({
      title: 'another category title',
      description: 'another category description'
    });

    expect(category.props).toStrictEqual({
      title: 'another category title',
      description: 'another category description',
      active: true,
      createdAt: now
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
});

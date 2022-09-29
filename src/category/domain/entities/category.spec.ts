import { Category } from './category';

describe("Category Unit Tests", ():void => {
  test("is category constructor", () => {
    const now = new Date();

    const testCategory = new Category({
      title: 'category title',
      description: 'category description',
      active: true,
      createdAt: now
    })

    expect(testCategory.props).toStrictEqual({
      title: 'category title',
      description: 'category description',
      active: true,
      createdAt: now
    })
  })
});


// faça seu teste falhar após ele passar
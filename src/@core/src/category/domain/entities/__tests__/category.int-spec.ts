import { Category } from "#category/domain/entities/category";

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it("should not validated a invalid category title prop", () => {
      expect(() => new Category({title: null})).toContainErrorMessages({
        title: [
          'title should not be empty',
          'title must be a string',
          'title must be shorter than or equal to 256 characters'
        ]
      });
    })
  
    it("should not validated a invalid category description prop", () => {
      expect(() => new Category({title: 'Filme', description: 5 as any})).toContainErrorMessages({
        description: [
          'description must be a string',
        ]
      });
    })
  })

  describe("update method", () => {
    it("should not validated a invalid category title update", () => {
      const category = new Category({title: 'Filmes'});

      expect(() => category.update(null)).toContainErrorMessages({
        title: [
          'title should not be empty',
          'title must be a string',
          'title must be shorter than or equal to 256 characters'
        ]
      });

      expect(() => category.update(undefined)).toContainErrorMessages({
        title: [
          'title should not be empty',
          'title must be a string',
          'title must be shorter than or equal to 256 characters'
        ]
      });

      expect(() => category.update("")).toContainErrorMessages({
        title: [
          'title should not be empty',
        ]
      });

      expect(() => category.update("Title".repeat(256))).toContainErrorMessages({
        title: [
          'title must be shorter than or equal to 256 characters'
        ]
      });

      expect(() => category.update(5 as any)).toContainErrorMessages({
        title: [
          'title must be a string',
          'title must be shorter than or equal to 256 characters'
        ]
      });

    })

    it("should not validated a invalid category description update", () => {
      const category = new Category({title: 'Filmes', description: 'Loucurinhas'});

      expect(() => category.update('Filmes', 5 as any)).toContainErrorMessages({
        description: [
          'description must be a string',
        ]
      });
    })

    it("should not validated a invalid category title and description update", () => {
      const category = new Category({title: 'Filmes', description: 'Loucurinhas'});
      
      expect(() => category.update(5 as any)).toContainErrorMessages({
        title: [
          'title must be a string',
          'title must be shorter than or equal to 256 characters'
        ]
      });

      expect(() => category.update('', 5 as any)).toContainErrorMessages({
        title: [
          'title should not be empty',
        ],
        description: [
          'description must be a string',
        ]
      });

      expect(() => category.update('Animes', 5 as any)).toContainErrorMessages({
        description: [
          'description must be a string',
        ]
      });
    })
  })
})
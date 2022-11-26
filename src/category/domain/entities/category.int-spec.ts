import ValidationError from "../../../@seedwork/errors/validation.error";
import { Category } from "./category"

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it("should not validated a invalid category title prop", () => {
      // required
      expect(() => new Category({title: null})).toThrow(
        new ValidationError('The title is required.')
      );
      expect(() => new Category({title: ""})).toThrow(
        new ValidationError('The title is required.')
      );
      expect(() => new Category({title: undefined})).toThrow(
        new ValidationError('The title is required.')
      );
  
      // max length
      expect(() => new Category({title: 'test'.repeat(256)})).toThrow(
        new ValidationError('The title is over the max-length.')
      );
  
      // string
      expect(() => new Category({title: 5 as any})).toThrow(
        new ValidationError('The title must be a string.')
      );
    })
  
    it("should not validated a invalid category description prop", () => {
      // string
      expect(() => new Category({title: 'Filme', description: 5 as any})).toThrow(
        new ValidationError('The description must be a string.')
      );
    })

    it("should not validated a invalid category active prop", () => {
      expect(() => new Category({title: 'Filme', active: 5 as any})).toThrow(
        new ValidationError('The active must be a boolean.')
      );
    })
  })

  describe("update method", () => {
    it("should not validated a invalid category title update", () => {
      const category = new Category({title: 'Filmes'});

      // required
      expect(() => category.update(null)).toThrow(
        new ValidationError('The title is required.')
      );
      expect(() => category.update(undefined)).toThrow(
        new ValidationError('The title is required.')
      );
      expect(() => category.update("")).toThrow(
        new ValidationError('The title is required.')
      );

      //max length
      expect(() => category.update("Title".repeat(256))).toThrow(
        new ValidationError('The title is over the max-length.')
      );

      // string
      expect(() => category.update(5 as any)).toThrow(
        new ValidationError('The title must be a string.')
      );
    })

    it("should not validated a invalid category description update", () => {
      const category = new Category({title: 'Filmes', description: 'Loucurinhas'});

      // string
      expect(() => category.update('Filmes', 5 as any)).toThrow(
        new ValidationError('The description must be a string.')
      );
    })

    it("should not validated a invalid category title and description update", () => {
      const category = new Category({title: 'Filmes', description: 'Loucurinhas'});

      expect(() => category.update('', 5 as any)).toThrow(
        new ValidationError('The title is required.')
      );

      expect(() => category.update('Animes', 5 as any)).toThrow(
        new ValidationError('The description must be a string.')
      );
    })
  })
})
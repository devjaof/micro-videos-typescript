import ValidationError from "../../../@seedwork/errors/validation.error";
import { Category } from "./category"

describe("Category Integration Tests", () => {
  describe("create method", () => {
    //invalid cases
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
  })
})
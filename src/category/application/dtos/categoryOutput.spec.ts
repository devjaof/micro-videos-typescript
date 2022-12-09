import { Category } from "#category/domain/entities/category"
import { CategoryOutputMapper } from "./categoryOutput";

describe('CategoryOutputMapper unit tests', () => {
  it('should convert category into output', () => {
    const dateNow = new Date();

    const entity = new Category({
      title: 'teste', 
      description: 'aaaaalguma coisinha',
      active: true,
      createdAt: dateNow
    });

    const spyToJson = jest.spyOn(entity, 'toJSON');
    const output = CategoryOutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      title: 'teste', 
      description: 'aaaaalguma coisinha',
      active: true,
      createdAt: dateNow
    })
  })
})
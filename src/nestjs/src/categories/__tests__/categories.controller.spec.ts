import { CreateCategoryUseCase } from '@jfr/micro-videos/category/application';
import { CategoriesController } from '../categories.controller';
import { CreateCategoryDto } from '../dto/create-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const mockOutput: CreateCategoryUseCase.Output = {
      id: 'teste',
      title: 'title',
      description: 'description',
      active: true,
      createdAt: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(mockOutput),
    };

    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      title: 'movie',
      description: 'description',
      active: true,
    };

    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(mockOutput).toStrictEqual(output);
  });

  it('should update a category', () => {
    expect(controller).toBeDefined();
  });

  it('should delete a category', () => {
    expect(controller).toBeDefined();
  });

  it('should get a category', () => {
    expect(controller).toBeDefined();
  });

  it('should list categories', () => {
    expect(controller).toBeDefined();
  });
});

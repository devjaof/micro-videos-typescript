import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
} from '@jfr/micro-videos/category/application';
import { CategoriesController } from '../categories.controller';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const mockOutput: CreateCategoryUseCase.Output = {
      id: '258d4d87-c57d-4ec5-81d9-6fbb9fc73929',
      title: 'title',
      description: 'description',
      active: true,
      createdAt: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(mockOutput),
    };

    // @ts-expect-error no need for repo here
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      title: 'movie',
      description: 'description',
      active: true,
    };

    const output = await controller.create(input);
    console.log(output);
    console.log(mockOutput);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(mockOutput).toStrictEqual(output);
  });

  it('should update a category', async () => {
    const mockOutput: UpdateCategoryUseCase.Output = {
      id: '258d4d87-c57d-4ec5-81d9-6fbb9fc73929',
      title: 'title',
      description: 'description',
      active: true,
      createdAt: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(mockOutput),
    };

    // @ts-expect-error no need for repo here
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: UpdateCategoryDto = {
      title: 'movie',
      description: 'description',
      active: true,
    };

    const id = '258d4d87-c57d-4ec5-81d9-6fbb9fc73929';

    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(mockOutput).toStrictEqual(output);
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

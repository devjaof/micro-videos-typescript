import { SortDirection } from '@jfr/micro-videos/@seedwork/domain';
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  UpdateCategoryUseCase,
  ListCategoriesUseCase,
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

  it('should delete a category', async () => {
    const id = '258d4d87-c57d-4ec5-81d9-6fbb9fc73929';
    const expectedOutput = undefined;

    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error aqui pode
    controller['deleteUseCase'] = mockDeleteUseCase;
    expect(controller.remove(id)).toBeInstanceOf(Promise);

    const output = await controller.remove(id);

    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should get a category', async () => {
    const id = '258d4d87-c57d-4ec5-81d9-6fbb9fc73929';
    const expectedOutput: GetCategoryUseCase.Output = {
      id,
      title: 'Movie',
      description: 'aaaaaa',
      active: true,
      createdAt: new Date(),
    };

    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error aqui pode
    controller['getUseCase'] = mockGetUseCase;
    const output = await controller.findOne(id);

    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const id = '258d4d87-c57d-4ec5-81d9-6fbb9fc73929';
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id,
          title: 'Movie',
          description: 'aaaaaa',
          active: true,
          createdAt: new Date(),
        },
      ],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };

    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-expect-error aqui pode
    controller['listUseCase'] = mockListUseCase;

    const searchParams = {
      page: 1,
      perPage: 2,
      sortField: 'title',
      sort: 'desc' as SortDirection,
      filter: 'teste',
    };

    const output = await controller.search(searchParams);

    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  });
});

/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@jfr/micro-videos/category/application';
import { CategoryRepository } from '@jfr/micro-videos/category/domain';
import { CategoryInMemoryRepository } from '@jfr/micro-videos/category/infra';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY_USECASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY.provide],
    };

    export const LIST_CATEGORY_USECASE = {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY.provide],
    };

    export const GET_CATEGORY_USECASE = {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY.provide],
    };

    export const UPDATE_CATEGORY_USECASE = {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY.provide],
    };

    export const DELETE_CATEGORY_USECASE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY.provide],
    };
  }
}

import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
// import {
//   CreateCategoryUseCase,
//   DeleteCategoryUseCase,
//   GetCategoryUseCase,
//   ListCategoriesUseCase,
//   UpdateCategoryUseCase,
// } from '@jfr/micro-videos/category/application';
// import { CategoryInMemoryRepository } from '@jfr/micro-videos/category/infra';
// import { CategoryRepository } from '@jfr/micro-videos/category/domain';

import { CreateCategoryUseCase } from '../../../@core/dist/category/application/useCases';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: CreateCategoryUseCase.UseCase,
      useClass: CreateCategoryUseCase.UseCase,
    },
    // {
    //   provide: ListCategoriesUseCase.UseCase,
    //   useFactory: (categoryRepo: CategoryRepository.Repository) => {
    //     return new ListCategoriesUseCase.UseCase(categoryRepo);
    //   },
    //   inject: ['CategoryInMemoryRepository'],
    // },
    // {
    //   provide: GetCategoryUseCase.UseCase,
    //   useFactory: (categoryRepo: CategoryRepository.Repository) => {
    //     return new GetCategoryUseCase.UseCase(categoryRepo);
    //   },
    //   inject: ['CategoryInMemoryRepository'],
    // },
    // {
    //   provide: UpdateCategoryUseCase.UseCase,
    //   useFactory: (categoryRepo: CategoryRepository.Repository) => {
    //     return new UpdateCategoryUseCase.UseCase(categoryRepo);
    //   },
    //   inject: ['CategoryInMemoryRepository'],
    // },
    // {
    //   provide: DeleteCategoryUseCase.UseCase,
    //   useFactory: (categoryRepo: CategoryRepository.Repository) => {
    //     return new DeleteCategoryUseCase.UseCase(categoryRepo);
    //   },
    //   inject: ['CategoryInMemoryRepository'],
    // },
  ],
})
export class CategoriesModule {}

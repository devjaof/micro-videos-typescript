import { CreateCategoryUseCase } from '@jfr/micro-videos/category/application';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  title: string;
  description?: string;
  active?: boolean;
}

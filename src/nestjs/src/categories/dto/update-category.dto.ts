import { UpdateCategoryUseCase } from '@jfr/micro-videos/category/application';

export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  title: string;
  description?: string;
  active?: boolean;
}

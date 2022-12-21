import { UpdateCategoryUseCase } from '@jfr/micro-videos/category/application';

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'>
{
  title: string;
  description?: string;
  active?: boolean;
}

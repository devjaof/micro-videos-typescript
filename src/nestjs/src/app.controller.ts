import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from '@jfr/micro-videos/category/domain';
import { CreateCategoryUseCase } from '@jfr/micro-videos/category/application';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(Category);
    return this.appService.getHello();
  }
}

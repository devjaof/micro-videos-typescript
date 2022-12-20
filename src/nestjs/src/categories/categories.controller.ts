import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CategoriesService)
  private readonly categoriesService: CategoriesService;

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log('dto', createCategoryDto);
    console.log('categoriesService', this.categoriesService);

    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  search(@Query() SearchParams: SearchCategoryDto) {
    return this.categoriesService.search(SearchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update({ id, ...updateCategoryDto });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove({ id });
  }
}

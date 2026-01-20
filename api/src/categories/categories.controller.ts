import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.categoriesService.create(body.name);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}

import { Body, Controller, Get, Post } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";

@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body()
    body: { title: string; amount: number; spentAt: string; categoryId?: string | null; currency?: string },
  ) {
    return this.expensesService.create(body);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }
}

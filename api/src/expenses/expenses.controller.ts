import { Body, Controller, Get, Post, Patch, Param } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./create-expense.dto";

@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body()
    body: { title: string; amount: number; spentAt: string; categoryId?: string | null; currency?: string; dto:CreateExpenseDto },
  ) {
    return this.expensesService.create(body);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }
  @Patch(":id/submit")
  submit(@Param("id") id: string) {
    return this.expensesService.submit(id);
  }

  @Patch(":id/approve")
  approve(@Param("id") id: string) {
    return this.expensesService.approve(id);
  }

  @Patch(":id/pay")
  pay(@Param("id") id: string) {
    return this.expensesService.pay(id);
  }
}

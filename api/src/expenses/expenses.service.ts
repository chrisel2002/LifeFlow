import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateExpenseDto } from "./create-expense.dto";
import { ExpenseStatus } from "@prisma/client";
@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; amount: number; spentAt: string; categoryId?: string | null; currency?: string; dto:CreateExpenseDto }) {
    return this.prisma.expense.create({
      data: {
        title: data.dto.title,
        amount: data.dto.amount,
        currency: data.currency ?? "EUR",
        spentAt: new Date(data.spentAt),
        categoryId: data.dto.categoryId,
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
      include: { Category: true },
    });
  }
  private async getOrThrow(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException("Expense not found");
    return expense;
  }

  async submit(id: string) {
    const expense = await this.getOrThrow(id);
    if (expense.status !== ExpenseStatus.CREATED) {
      throw new BadRequestException("Invalid transition: only CREATED can be submitted");
    }
    return this.prisma.expense.update({
      where: { id },
      data: { status: ExpenseStatus.SUBMITTED },
    });
  }

  async approve(id: string) {
    const expense = await this.getOrThrow(id);
    if (expense.status !== ExpenseStatus.SUBMITTED) {
      throw new BadRequestException("Invalid transition: only SUBMITTED can be approved");
    }
    return this.prisma.expense.update({
      where: { id },
      data: { status: ExpenseStatus.APPROVED },
    });
  }

  async pay(id: string) {
    const expense = await this.getOrThrow(id);
    if (expense.status !== ExpenseStatus.APPROVED) {
      throw new BadRequestException("Invalid transition: only APPROVED can be paid");
    }
    return this.prisma.expense.update({
      where: { id },
      data: { status: ExpenseStatus.PAID },
    });
  }
}

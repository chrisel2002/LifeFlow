import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; amount: number; spentAt: string; categoryId?: string | null; currency?: string }) {
    return this.prisma.expense.create({
      data: {
        title: data.title,
        amount: data.amount,
        currency: data.currency ?? "EUR",
        spentAt: new Date(data.spentAt),
        categoryId: data.categoryId ?? null,
      },
    });
  }

  findAll() {
    return this.prisma.expense.findMany({
      orderBy: { spentAt: "desc" },
      include: { Category: true },
    });
  }
}

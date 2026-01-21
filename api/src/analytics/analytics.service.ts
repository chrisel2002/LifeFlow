import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async monthlyExpenses(year: number, month: number) {
    // month: 1-12
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));

    const expenses = await this.prisma.expense.findMany({
      where: {
        createdAt: { gte: start, lt: end },
      },
      include: { Category: true }, // requires relation exists in schema
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const byCategoryMap = new Map<string, number>();
    for (const e of expenses) {
      const name = e.Category?.name ?? "Unknown";
      byCategoryMap.set(name, (byCategoryMap.get(name) ?? 0) + e.amount);
    }

    const byCategory = Array.from(byCategoryMap.entries()).map(([name, total]) => ({
      name,
      total,
    }));

    return {
      month: `${year}-${String(month).padStart(2, "0")}`,
      total,
      byCategory,
    };
  }
}

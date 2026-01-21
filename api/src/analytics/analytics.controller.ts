import { Controller, Get, Query } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get("expenses/monthly")
  monthly(@Query("year") year?: string, @Query("month") month?: string) {
    const now = new Date();
    const y = year ? Number(year) : now.getUTCFullYear();
    const m = month ? Number(month) : now.getUTCMonth() + 1;

    return this.analyticsService.monthlyExpenses(y, m);
  }
}

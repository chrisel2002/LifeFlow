/*
  Warnings:

  - Made the column `categoryId` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('CREATED', 'SUBMITTED', 'APPROVED', 'PAID', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "status" "ExpenseStatus" NOT NULL DEFAULT 'CREATED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

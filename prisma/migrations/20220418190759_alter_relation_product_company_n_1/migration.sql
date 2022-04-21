/*
  Warnings:

  - You are about to drop the `ProductCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCompany" DROP CONSTRAINT "ProductCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCompany" DROP CONSTRAINT "ProductCompany_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "company_id" TEXT;

-- DropTable
DROP TABLE "ProductCompany";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

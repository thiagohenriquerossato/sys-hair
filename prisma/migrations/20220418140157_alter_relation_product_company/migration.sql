/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_CompanyToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompanyToProduct" DROP CONSTRAINT "_CompanyToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToProduct" DROP CONSTRAINT "_CompanyToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "appointmentId";

-- DropTable
DROP TABLE "_CompanyToProduct";

-- CreateTable
CREATE TABLE "ProductCompany" (
    "product_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "ProductCompany_pkey" PRIMARY KEY ("product_id","company_id")
);

-- AddForeignKey
ALTER TABLE "ProductCompany" ADD CONSTRAINT "ProductCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCompany" ADD CONSTRAINT "ProductCompany_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

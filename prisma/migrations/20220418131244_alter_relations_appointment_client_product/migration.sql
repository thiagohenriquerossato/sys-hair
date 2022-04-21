/*
  Warnings:

  - You are about to drop the `AppointmentProductsClients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppointmentProductsClients" DROP CONSTRAINT "AppointmentProductsClients_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentProductsClients" DROP CONSTRAINT "AppointmentProductsClients_client_id_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentProductsClients" DROP CONSTRAINT "AppointmentProductsClients_product_id_fkey";

-- DropTable
DROP TABLE "AppointmentProductsClients";

-- CreateTable
CREATE TABLE "AppointmentProducts" (
    "appointment_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "AppointmentProducts_pkey" PRIMARY KEY ("appointment_id","product_id")
);

-- CreateTable
CREATE TABLE "AppointmentClients" (
    "appointment_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "AppointmentClients_pkey" PRIMARY KEY ("appointment_id","client_id")
);

-- AddForeignKey
ALTER TABLE "AppointmentProducts" ADD CONSTRAINT "AppointmentProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentProducts" ADD CONSTRAINT "AppointmentProducts_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentClients" ADD CONSTRAINT "AppointmentClients_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentClients" ADD CONSTRAINT "AppointmentClients_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

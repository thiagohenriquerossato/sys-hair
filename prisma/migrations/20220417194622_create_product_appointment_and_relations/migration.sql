-- CreateEnum
CREATE TYPE "AppontmentStatus" AS ENUM ('Aberto', 'Fechado', 'Cancelado');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "responsible" TEXT NOT NULL,
    "status" "AppontmentStatus" NOT NULL DEFAULT E'Aberto',
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentProductsClients" (
    "appointment_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "AppointmentProductsClients_pkey" PRIMARY KEY ("appointment_id","product_id","client_id")
);

-- CreateTable
CREATE TABLE "_CompanyToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToProduct_AB_unique" ON "_CompanyToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToProduct_B_index" ON "_CompanyToProduct"("B");

-- AddForeignKey
ALTER TABLE "AppointmentProductsClients" ADD CONSTRAINT "AppointmentProductsClients_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentProductsClients" ADD CONSTRAINT "AppointmentProductsClients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentProductsClients" ADD CONSTRAINT "AppointmentProductsClients_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToProduct" ADD FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToProduct" ADD FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

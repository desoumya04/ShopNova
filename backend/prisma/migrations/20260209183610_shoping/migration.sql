/*
  Warnings:

  - A unique constraint covering the columns `[sellerId]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bank_sellerId_key" ON "Bank"("sellerId");

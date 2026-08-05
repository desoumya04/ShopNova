/*
  Warnings:

  - You are about to drop the column `accountHolderName` on the `Bank` table. All the data in the column will be lost.
  - Added the required column `accountHolder` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "accountHolderName",
ADD COLUMN     "accountHolder" TEXT NOT NULL;

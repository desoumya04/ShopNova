/*
  Warnings:

  - You are about to drop the column `pincode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `ifscCode` on the `Bank` table. All the data in the column will be lost.
  - Added the required column `pinCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "pincode",
ADD COLUMN     "pinCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "ifscCode",
ADD COLUMN     "ifcCode" TEXT;

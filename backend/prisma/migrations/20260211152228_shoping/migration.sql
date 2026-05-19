/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Business` table. All the data in the column will be lost.
  - Added the required column `businessId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_sellerId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "sellerId",
ADD COLUMN     "businessId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "address";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

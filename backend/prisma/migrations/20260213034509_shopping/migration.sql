/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_businessId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "pinCode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

/*
  Warnings:

  - You are about to drop the column `address` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `locality` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `pinCode` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `gstIn` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiresAt` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerified` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sellerId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BusinessCategory" AS ENUM ('ELECTRONICS', 'FASHION', 'HOME_APPLIANCES', 'BOOKS', 'BEAUTY', 'SPORTS', 'TOYS', 'GROCERY', 'JEWELRY', 'AUTOMOTIVE', 'PET_SUPPLIES', 'HEALTHCARE', 'OFFICE_SUPPLIES', 'ART_CRAFTS', 'MUSIC_INSTRUMENTS', 'OUTDOOR_RECREATION');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_sellerId_fkey";

-- DropIndex
DROP INDEX "Seller_email_key";

-- DropIndex
DROP INDEX "Seller_mobile_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "address",
DROP COLUMN "locality",
DROP COLUMN "phone",
DROP COLUMN "pinCode",
DROP COLUMN "state",
ADD COLUMN     "category" "BusinessCategory" NOT NULL DEFAULT 'ELECTRONICS',
ADD COLUMN     "gstIn" TEXT,
ADD COLUMN     "mobile" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "email",
DROP COLUMN "gstIn",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "otp",
DROP COLUMN "otpExpiresAt",
DROP COLUMN "otpVerified",
DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessAddress" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "BusinessAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAddress_businessId_key" ON "BusinessAddress"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_sellerId_key" ON "Business"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userId_key" ON "Seller"("userId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAddress" ADD CONSTRAINT "BusinessAddress_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `costPrice` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `discountPrice` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "costPrice" DECIMAL(10,2),
ADD COLUMN     "discountPrice" DECIMAL(10,2),
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "costPrice",
DROP COLUMN "discountPrice",
DROP COLUMN "price",
DROP COLUMN "stock";

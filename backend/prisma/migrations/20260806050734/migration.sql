/*
  Warnings:

  - The values [JEWELRY,AUTOMOTIVE,PET_SUPPLIES,HEALTHCARE,OFFICE_SUPPLIES,ART_CRAFTS,MUSIC_INSTRUMENTS,OUTDOOR_RECREATION] on the enum `BusinessCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BusinessCategory_new" AS ENUM ('ELECTRONICS', 'FASHION', 'GROCERY', 'BEAUTY', 'SPORTS', 'HOME_APPLIANCES', 'BOOKS', 'TOYS', 'OTHER');
ALTER TABLE "public"."Business" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Business" ALTER COLUMN "category" TYPE "BusinessCategory_new" USING ("category"::text::"BusinessCategory_new");
ALTER TYPE "BusinessCategory" RENAME TO "BusinessCategory_old";
ALTER TYPE "BusinessCategory_new" RENAME TO "BusinessCategory";
DROP TYPE "public"."BusinessCategory_old";
ALTER TABLE "Business" ALTER COLUMN "category" SET DEFAULT 'ELECTRONICS';
COMMIT;

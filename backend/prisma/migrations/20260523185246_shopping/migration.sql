-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

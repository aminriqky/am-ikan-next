/*
  Warnings:

  - You are about to drop the column `c1` on the `Hasil` table. All the data in the column will be lost.
  - You are about to drop the column `c2` on the `Hasil` table. All the data in the column will be lost.
  - You are about to drop the column `c3` on the `Hasil` table. All the data in the column will be lost.
  - You are about to drop the column `c4` on the `Hasil` table. All the data in the column will be lost.
  - Added the required column `hasil1` to the `Hasil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasil2` to the `Hasil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasil3` to the `Hasil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasil4` to the `Hasil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terbaik` to the `Hasil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hasil" DROP COLUMN "c1",
DROP COLUMN "c2",
DROP COLUMN "c3",
DROP COLUMN "c4",
ADD COLUMN     "hasil1" DECIMAL NOT NULL,
ADD COLUMN     "hasil2" DECIMAL NOT NULL,
ADD COLUMN     "hasil3" DECIMAL NOT NULL,
ADD COLUMN     "hasil4" DECIMAL NOT NULL,
ADD COLUMN     "terbaik" DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE "Kriteria" (
    "id" SERIAL NOT NULL,
    "CorB" VARCHAR(255) NOT NULL,
    "kepentingan" INTEGER NOT NULL,
    "c1" INTEGER NOT NULL,
    "c2" INTEGER NOT NULL,
    "c3" INTEGER NOT NULL,
    "c4" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Normalisasi" (
    "id" SERIAL NOT NULL,
    "pembagi" INTEGER NOT NULL,
    "n1" DECIMAL NOT NULL,
    "n2" DECIMAL NOT NULL,
    "n3" DECIMAL NOT NULL,
    "n4" DECIMAL NOT NULL,
    "kriteriaId" INTEGER NOT NULL,
    "hasilId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Normalisasi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kriteria" ADD CONSTRAINT "Kriteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Normalisasi" ADD CONSTRAINT "Normalisasi_kriteriaId_fkey" FOREIGN KEY ("kriteriaId") REFERENCES "Kriteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Normalisasi" ADD CONSTRAINT "Normalisasi_hasilId_fkey" FOREIGN KEY ("hasilId") REFERENCES "Hasil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

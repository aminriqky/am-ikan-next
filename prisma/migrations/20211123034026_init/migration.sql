/*
  Warnings:

  - Changed the type of `c1` on the `Hasil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `c2` on the `Hasil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `c3` on the `Hasil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `c4` on the `Hasil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Hasil" DROP COLUMN "c1",
ADD COLUMN     "c1" DECIMAL NOT NULL,
DROP COLUMN "c2",
ADD COLUMN     "c2" DECIMAL NOT NULL,
DROP COLUMN "c3",
ADD COLUMN     "c3" DECIMAL NOT NULL,
DROP COLUMN "c4",
ADD COLUMN     "c4" DECIMAL NOT NULL;

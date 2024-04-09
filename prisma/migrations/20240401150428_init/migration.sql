/*
  Warnings:

  - You are about to drop the column `companyName` on the `accidents` table. All the data in the column will be lost.
  - Added the required column `companyWeWorkedFor` to the `accidents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accidents" DROP COLUMN "companyName",
ADD COLUMN     "companyWeWorkedFor" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" BOOLEAN;

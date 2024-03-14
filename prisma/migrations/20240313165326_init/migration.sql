/*
  Warnings:

  - You are about to drop the column `accidentdescription` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `accidentlocation` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `assignedtocompany` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `backtowork` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `companyname` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `dateofaccident` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `documentfolder` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `firstcheck` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `lastcheck` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `lastdayofwork` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `datecreated` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `accesslvl` on the `users` table. All the data in the column will be lost.
  - Added the required column `accessLvl` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accidents" DROP COLUMN "accidentdescription",
DROP COLUMN "accidentlocation",
DROP COLUMN "assignedtocompany",
DROP COLUMN "backtowork",
DROP COLUMN "companyname",
DROP COLUMN "dateofaccident",
DROP COLUMN "documentfolder",
DROP COLUMN "firstcheck",
DROP COLUMN "lastcheck",
DROP COLUMN "lastdayofwork",
ADD COLUMN     "accidentDescription" TEXT,
ADD COLUMN     "accidentLocation" VARCHAR,
ADD COLUMN     "assignedToCompany" VARCHAR,
ADD COLUMN     "backToWork" VARCHAR,
ADD COLUMN     "companyName" VARCHAR,
ADD COLUMN     "dateOfAccident" VARCHAR,
ADD COLUMN     "documentFolder" VARCHAR,
ADD COLUMN     "firstCheck" VARCHAR,
ADD COLUMN     "lastCheck" VARCHAR,
ADD COLUMN     "lastDayOfWork" VARCHAR;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "datecreated",
ADD COLUMN     "dateCreated" VARCHAR;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accesslvl",
ADD COLUMN     "accessLvl" TEXT NOT NULL;

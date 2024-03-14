/*
  Warnings:

  - Made the column `report` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `efroi` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `witness` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correspondence` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notice` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accidentDescription` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accidentLocation` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assignedToCompany` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backToWork` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyName` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfAccident` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `documentFolder` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstCheck` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastCheck` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastDayOfWork` on table `accidents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userid` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateCreated` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accidents" ALTER COLUMN "report" SET NOT NULL,
ALTER COLUMN "efroi" SET NOT NULL,
ALTER COLUMN "witness" SET NOT NULL,
ALTER COLUMN "correspondence" SET NOT NULL,
ALTER COLUMN "notice" SET NOT NULL,
ALTER COLUMN "accidentDescription" SET NOT NULL,
ALTER COLUMN "accidentLocation" SET NOT NULL,
ALTER COLUMN "assignedToCompany" SET NOT NULL,
ALTER COLUMN "backToWork" SET NOT NULL,
ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "dateOfAccident" SET NOT NULL,
ALTER COLUMN "documentFolder" SET NOT NULL,
ALTER COLUMN "firstCheck" SET NOT NULL,
ALTER COLUMN "lastCheck" SET NOT NULL,
ALTER COLUMN "lastDayOfWork" SET NOT NULL;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "userid" SET NOT NULL,
ALTER COLUMN "dateCreated" SET NOT NULL;

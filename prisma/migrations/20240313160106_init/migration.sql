/*
  Warnings:

  - Added the required column `accesslvl` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accesslvl" TEXT NOT NULL;

/*
  Warnings:

  - Made the column `bookmarkId` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Image" ALTER COLUMN "bookmarkId" SET NOT NULL;

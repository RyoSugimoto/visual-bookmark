/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bookmark" ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_imageId_key" ON "public"."Bookmark"("imageId");

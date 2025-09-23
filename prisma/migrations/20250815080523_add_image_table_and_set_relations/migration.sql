/*
  Warnings:

  - You are about to drop the column `image` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Bookmark" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(400) NOT NULL,
    "userId" TEXT NOT NULL,
    "bookmarkId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_bookmarkId_key" ON "public"."Image"("bookmarkId");

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "public"."Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `imageId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Bookmark" DROP COLUMN "imageId",
ADD COLUMN     "imageFileId" TEXT;

-- DropTable
DROP TABLE "public"."Image";

-- CreateTable
CREATE TABLE "public"."File" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(400) NOT NULL,
    "userId" TEXT NOT NULL,
    "bookmarkId" TEXT[],

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Bookmark" ADD CONSTRAINT "Bookmark_imageFileId_fkey" FOREIGN KEY ("imageFileId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "public"."Bookmark_imageId_key";

-- AlterTable
ALTER TABLE "public"."Bookmark" ALTER COLUMN "imageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Image" ALTER COLUMN "bookmarkId" DROP NOT NULL;

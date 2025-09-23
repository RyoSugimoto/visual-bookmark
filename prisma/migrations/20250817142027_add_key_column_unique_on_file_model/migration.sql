/*
  Warnings:

  - You are about to alter the column `key` on the `File` table. The data in that column could be lost. The data in that column will be cast from `VarChar(400)` to `VarChar(100)`.
  - A unique constraint covering the columns `[key]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."File" ALTER COLUMN "key" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "public"."File"("key");

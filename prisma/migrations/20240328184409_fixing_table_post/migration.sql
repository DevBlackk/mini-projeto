/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `urlImage` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_postId_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "urlImage" TEXT NOT NULL;

-- DropTable
DROP TABLE "image";

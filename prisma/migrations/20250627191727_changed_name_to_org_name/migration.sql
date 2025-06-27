/*
  Warnings:

  - You are about to drop the column `name` on the `merchants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgName]` on the table `merchants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgName` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "merchants_name_key";

-- AlterTable
ALTER TABLE "merchants" DROP COLUMN "name",
ADD COLUMN     "orgName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "merchants_orgName_key" ON "merchants"("orgName");

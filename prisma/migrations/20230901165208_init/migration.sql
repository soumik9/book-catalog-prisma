/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('admin', 'customer');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'customer';

-- DropEnum
DROP TYPE "UserRoleENUM";

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

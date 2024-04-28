/*
  Warnings:

  - You are about to alter the column `total_ticket` on the `user_entries` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user_entries` MODIFY `total_ticket` INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `userId` to the `User_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_entries` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User_entries` ADD CONSTRAINT `User_entries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

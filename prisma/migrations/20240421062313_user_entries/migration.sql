/*
  Warnings:

  - You are about to alter the column `total_amount` on the `user_entries` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `user_entries` MODIFY `selected_number` VARCHAR(191) NOT NULL,
    MODIFY `total_ticket` VARCHAR(191) NOT NULL,
    MODIFY `total_amount` DOUBLE NOT NULL;

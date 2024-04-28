/*
  Warnings:

  - You are about to drop the column `result_number` on the `ticket_results` table. All the data in the column will be lost.
  - Added the required column `total_amount` to the `ticket_results` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ticket_results_result_number_key` ON `ticket_results`;

-- AlterTable
ALTER TABLE `ticket_results` DROP COLUMN `result_number`,
    ADD COLUMN `total_amount` DOUBLE NOT NULL;

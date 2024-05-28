-- DropIndex
DROP INDEX `user_twitter_handle_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `twitter_pic` VARCHAR(191) NULL;

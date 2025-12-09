-- AlterTable
ALTER TABLE `profile` ADD COLUMN `name` VARCHAR(191),
ADD COLUMN `email` VARCHAR(191),
ADD COLUMN `phone` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `profile_email_key` ON `profile`(`email`);

/*
  Warnings:

  - A unique constraint covering the columns `[verification_token]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verification_token` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_verification_token_key` ON `user`(`verification_token`);

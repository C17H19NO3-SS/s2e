/*
  Warnings:

  - You are about to drop the `ApiKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ApiKeys`;

-- CreateTable
CREATE TABLE `api_keys` (
    `id` INTEGER NOT NULL,
    `api_key` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `api_keys_api_key_key`(`api_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

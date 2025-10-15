/*
  Warnings:

  - Added the required column `permissions` to the `api_keys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `api_keys` ADD COLUMN `permissions` VARCHAR(1024) NOT NULL;

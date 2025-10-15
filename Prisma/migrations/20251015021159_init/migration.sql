/*
  Warnings:

  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(64) NOT NULL,
    ADD COLUMN `password` VARCHAR(128) NOT NULL,
    ADD COLUMN `telephone` VARCHAR(64) NOT NULL;

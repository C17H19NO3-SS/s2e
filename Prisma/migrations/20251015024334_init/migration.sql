/*
  Warnings:

  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `username` VARCHAR(32) NOT NULL,
    ADD COLUMN `verified` BIT(1) NOT NULL;

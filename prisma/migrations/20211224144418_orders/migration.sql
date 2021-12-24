/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the column `createdAt` on the `ProductsOrder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductsOrder` table. All the data in the column will be lost.
  - Made the column `orderId` on table `ProductsOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ProductsOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ProductsOrder` DROP FOREIGN KEY `ProductsOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsOrder` DROP FOREIGN KEY `ProductsOrder_productId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `ProductsOrder` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `orderId` INTEGER NOT NULL,
    MODIFY `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductsOrder` ADD CONSTRAINT `ProductsOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsOrder` ADD CONSTRAINT `ProductsOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

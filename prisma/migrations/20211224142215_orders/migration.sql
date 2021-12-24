/*
  Warnings:

  - You are about to drop the `ProductsOnOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductsOnOrder` DROP FOREIGN KEY `ProductsOnOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsOnOrder` DROP FOREIGN KEY `ProductsOnOrder_productId_fkey`;

-- DropTable
DROP TABLE `ProductsOnOrder`;

-- CreateTable
CREATE TABLE `ProductsOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `orderId` INTEGER NULL,
    `productId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductsOrder` ADD CONSTRAINT `ProductsOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsOrder` ADD CONSTRAINT `ProductsOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

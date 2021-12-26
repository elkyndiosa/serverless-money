import { getPrisma } from '@libs/prisma';
import { OrderAttributeType } from '@src/structures/order.type';
import { PorductAttributeType } from '@src/structures/product.type';

const calculateTotal = (products: PorductAttributeType[]): number => {
  let total = 0;
  products.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
};
export const createOrder = async (order: OrderAttributeType): Promise<any> => {
  const prisma = await getPrisma();
  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: order.userId,
        total: calculateTotal(order.products),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
    order.products.forEach(async (product) => {
      await prisma.productsOrder.create({
        data: {
          orderId: newOrder.id,
          productId: product.id,
          total: product.price * product.quantity,
          quantity: product.quantity,
        },
      });
    });

    await prisma.$disconnect();
    return newOrder;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception message');
  }
};
export const checkProduct = async (products: PorductAttributeType[]): Promise<boolean> => {
  const prisma = await getPrisma();
  let response: boolean = true;
  try {
    await Promise.all(
      products.map(async (product) => {
        const existProduct = await prisma.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!existProduct) response = false;
      }),
    );
    await prisma.$disconnect();

    return response;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception to check product');
  }
};

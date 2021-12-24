import { getPrisma } from '@libs/prisma';
import { UserAttributeType } from '@src/structures/user.type';

type DataSearch = {
  email?: string;
  id?: number;
};
type CheckUserHasMoneyType = {
  id: number;
  money: number;
};
export const createUser = async (user: UserAttributeType): Promise<UserAttributeType> => {
  const prisma = await getPrisma();
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    await prisma.$disconnect();
    return newUser;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception message');
  }
};
export const checkUser = async (data: DataSearch): Promise<boolean> => {
  const { email, id } = data;
  const prisma = await getPrisma();
  try {
    const user = await prisma.user.findMany({
      where: {
        OR: [{ id }, { email }],
      },
    });
    await prisma.$disconnect();

    return user.length > 0;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception to check user');
  }
};
export const updateBalanceUser = async (balanceToIncrease: number, id: number): Promise<UserAttributeType> => {
  const prisma = await getPrisma();
  id = parseInt(id.toString());
  balanceToIncrease = parseInt(balanceToIncrease.toString());
  console.log(balanceToIncrease, id);
  console.log(typeof balanceToIncrease, typeof id);
  try {
    const userUpdated = await prisma.user.update({
      where: { id },
      data: {
        balance: {
          decrement: balanceToIncrease,
        },
      },
    });

    await prisma.$disconnect();

    return userUpdated;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception to check user');
  }
};
export const checkUserHasMoney = async (data: CheckUserHasMoneyType): Promise<boolean> => {
  const prisma = await getPrisma();
  const { id, money } = data;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    await prisma.$disconnect();

    return user.balance >= money;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception to check balance of user');
  }
};

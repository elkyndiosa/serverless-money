import { getPrisma } from '@libs/prisma';
import { UserAttributeType } from '@src/structures/user.type';

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
export const checkUser = async (email: string): Promise<boolean> => {
  const prisma = await getPrisma();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);
    await prisma.$disconnect();

    return !!user;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw new Error('Exception to check user');
  }
};

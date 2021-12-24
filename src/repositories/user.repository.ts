import { getPrisma } from '@libs/prisma';
import { UserAttributeType } from '@src/structures/user.type';

type DataSearch = {
  email?: string;
  id?: number;
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

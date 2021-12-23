import { PrismaClient } from '@prisma/client';

export const getPrisma = async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  return prisma;
};

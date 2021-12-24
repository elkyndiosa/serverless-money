import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const productComputer = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Computer',
      slug: 'computer',
      available: 300,
      price: 2300000,
      description: 'Computer gamer',
    },
  });
  const productMouse = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Mouse',
      slug: 'mouse',
      available: 600,
      price: 180000,
      description: 'Mouse logictech',
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  });
  console.log({ users: { alice, bob }, productos: { productComputer, productMouse } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import 'source-map-support/register';

import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';
  const body = isString ? JSON.parse(event.body) : event.body;

  async function main() {
    await prisma.$connect();
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
    // ... you will write your Prisma Client queries here
  }

  await main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  try {
    return successResponse({
      message: `User Created Successfully!`,
      body,
    });
  } catch (error) {
    console.error(error);

    return errorResponse({
      message: `Sorry, there was an error creating the candidate!`,
      error,
    });
  }
};

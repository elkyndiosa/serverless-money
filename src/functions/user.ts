import 'source-map-support/register';

import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserType } from '@src/structures/user.type';
import { createUser, checkUser } from '@src/repositories/user.repository';

export const create = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';

  const body: UserType = isString ? JSON.parse(event.body) : event.body;
  console.log(body);
  const { attributes } = body.data;
  try {
    const existUser = await checkUser(attributes.email);
    if (existUser)
      return errorResponse({
        message: `Sorry, User already exists!`,
        statusCode: 400,
      });
    const user = await createUser(attributes);
    return successResponse({
      message: `User Created Successfully!`,
      user,
    });
  } catch (error) {
    console.error(error);

    return errorResponse({
      message: `Sorry, there was an error creating the user!`,
      error,
    });
  }
};

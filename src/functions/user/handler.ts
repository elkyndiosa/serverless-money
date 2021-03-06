import 'source-map-support/register';

import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserIncreaseBalanceType, UserType } from '@src/structures/user.type';
import {
  createUser,
  checkUser,
  increaseBalenceOfUser,
  decreaseBalenceOfUser,
  checkUserHasMoney,
} from '@src/repositories/user.repository';

export const create = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';
  const body: UserType = isString ? JSON.parse(event.body) : event.body;
  const { attributes } = body.data;
  try {
    const existUser = await checkUser({ email: attributes.email });
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
export const increaseBalence = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';
  const body: UserIncreaseBalanceType = isString ? JSON.parse(event.body) : event.body;
  const { attributes } = body.data;

  try {
    const existUser = await checkUser({ id: attributes.userId });

    if (!existUser)
      return errorResponse({
        message: `Sorry, User not found!`,
        statusCode: 400,
      });
    const user = await increaseBalenceOfUser(attributes.userId, attributes.value);
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
export const transfer = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';
  const body: UserIncreaseBalanceType = isString ? JSON.parse(event.body) : event.body;
  const { attributes } = body.data;

  const userIdSource = parseInt(event.requestContext.authorizer.userId);

  try {
    const existUser = await checkUser({ id: attributes.userId });

    if (!existUser)
      return errorResponse({
        message: `Sorry, User not found!`,
        statusCode: 400,
      });
    const userHasMoney = await checkUserHasMoney({ id: userIdSource, money: attributes.value });
    if (!userHasMoney)
      return errorResponse({
        message: `Sorry, usur does not have the necessary money!`,
        statusCode: 400,
      });
    const user = await decreaseBalenceOfUser(attributes.value, userIdSource);
    await increaseBalenceOfUser(attributes.userId, attributes.value);
    return successResponse({
      message: `Money transfer Successfully!`,
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

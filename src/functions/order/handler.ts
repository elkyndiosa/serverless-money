import 'source-map-support/register';

import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { checkProduct, createOrder } from '@src/repositories/order.repository';
import { OrderType } from '@src/structures/order.type';
import { checkUser } from '@src/repositories/user.repository';

export const create = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';
  const body: OrderType = isString ? JSON.parse(event.body) : event.body;
  const { attributes } = body.data;

  try {
    const existUser = await checkUser({ id: attributes.userId });

    const existProduct = await checkProduct(attributes.products);

    if (!existUser || !existProduct) {
      const typeExist = !existUser ? 'User' : 'Product';
      return errorResponse({
        message: `Sorry, ${typeExist} not found!`,
        statusCode: 400,
      });
    }
    const order = await createOrder(attributes);
    return successResponse({
      message: `User Created Successfully!`,
      order,
    });
  } catch (error) {
    console.error(error);

    return errorResponse({
      message: `Sorry, there was an error creating the user!`,
      error,
    });
  }
};

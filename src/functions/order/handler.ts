import 'source-map-support/register';

import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { checkProduct, createOrder } from '@src/repositories/order.repository';
import { OrderType } from '@src/structures/order.type';
import { checkUser, checkUserHasMoney, updateBalanceUser } from '@src/repositories/user.repository';

export const create = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const isString = typeof event.body === 'string';
  const body: OrderType = isString ? JSON.parse(event.body) : event.body;
  const { attributes } = body.data;

  try {
    const existUser = await checkUser({ id: attributes.userId });
    const userHasMoney = await checkUserHasMoney({ id: attributes.userId, money: attributes.total });
    if (!userHasMoney)
      return errorResponse({
        message: `Sorry, usurio does not have the necessary money!`,
        statusCode: 400,
      });
    const existProduct = await checkProduct(attributes.products);

    if (!existUser || !existProduct) {
      const typeExist = !existUser ? 'User' : 'Product';
      return errorResponse({
        message: `Sorry, ${typeExist} not found!`,
        statusCode: 400,
      });
    }

    const order = await createOrder(attributes);
    await updateBalanceUser(order.total, order.userId);
    order.total = parseInt(order.total);

    return successResponse({
      message: `Order Created Successfully!`,
      order: { ...order, products: attributes.products },
    });
  } catch (error) {
    console.error(error);

    return errorResponse({
      message: `Sorry, there was an error creating the order!`,
      error,
    });
  }
};

import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '@src/testUtils/eventGenerator';
import { increaseBalence } from '@functions/user/handler';
import { create } from './handler';
import mock = require('./mock.json');
import mockBalance = require('../user/mockBalance.json');

describe('Validating entity Order', () => {
  test('Creation of resource', async () => {
    // Increase balance of user
    const eventBalance = eventGenerator(mockBalance);
    await increaseBalence(eventBalance);

    const event = eventGenerator(mock);
    const resp = await create(event);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);

    expect(body).toEqual({
      message: `Order Created Successfully!`,
      order: {
        ...mock.body.data.attributes,
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });
  test('Creation of resource use not existing', async () => {
    mock.body.data.attributes.userId = 212;
    const event = eventGenerator(mock);
    const resp = await create(event);
    expect(resp.statusCode).toBe(400);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Sorry, User not found!`,
      statusCode: 400,
    });
  });
  test('Creation of resource use not existing', async () => {
    mock.body.data.attributes.products[0].id = 212;
    const event = eventGenerator(mock);
    const resp = await create(event);
    expect(resp.statusCode).toBe(400);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Sorry, User not found!`,
      statusCode: 400,
    });
  });
});

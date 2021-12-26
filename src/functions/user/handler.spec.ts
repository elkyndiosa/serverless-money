import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '@src/testUtils/eventGenerator';
import { create, transfer } from './handler';
import mock = require('./mock.json');
import mockBalance = require('./mockBalance.json');

describe('Validating entity User', () => {
  mock.body.data.attributes.email = `test-elkyn${Math.random()}@gmail.com`;
  test('Creation of resource', async () => {
    const event = eventGenerator(mock);
    const resp = await create(event);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `User Created Successfully!`,
      user: {
        ...mock.body.data.attributes,
        balance: 0,
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });
  test('Creation of resource existing', async () => {
    const event = eventGenerator(mock);
    const resp = await create(event);
    expect(resp.statusCode).toBe(400);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Sorry, User already exists!`,
      statusCode: 400,
    });
  });
});
describe('Validating entity User transfer', () => {
  test('Transfer money success', async () => {
    mockBalance.body.data.attributes.userId = 1;
    mockBalance.body.data.attributes.value = 100000;
    const event = eventGenerator(mockBalance);
    const resp = await transfer(event);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Money transfer Successfully!`,
      user: {
        email: expect.any(String),
        name: expect.any(String),
        balance: expect.any(Number),
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });
  test('Trasnfer money when userId no exist', async () => {
    mockBalance.body.data.attributes.userId = 100000;
    const event = eventGenerator(mockBalance);
    const resp = await transfer(event);
    expect(resp.statusCode).toBe(400);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Sorry, User not found!`,
      statusCode: 400,
    });
  });
  test('Trasnfer whitout money', async () => {
    mockBalance.body.data.attributes.userId = 1;
    mockBalance.body.data.attributes.value = 600000000;
    const event = eventGenerator(mockBalance);
    const resp = await transfer(event);
    expect(resp.statusCode).toBe(400);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Sorry, usur does not have the necessary money!`,
      statusCode: 400,
    });
  });
});

import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '@src/testUtils/eventGenerator';
import { create } from './user';
import mock = require('./mock.json');

describe('Validating entity User', () => {
  test('Creation of resource', async () => {
    mock.body.data.attributes.email = `test-elkyn${Math.random()}@gmail.com`;
    const event = eventGenerator(mock);
    const resp = await create(event);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `User Created Successfully!`,
      user: { ...mock.body.data.attributes, balance: 0, id: expect.any(Number) },
    });
  });
});

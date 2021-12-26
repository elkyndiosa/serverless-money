import AuthPolicy from '@src/structures/authPolicy';

const generatePolicy = (data): AuthPolicy => {
  const { token, Action = '*', Effect = 'Allow', Resource = '*' } = data;
  return {
    principalId: token,
    policyDocument: {
      Version: new Date(),
      Statement: [
        {
          Action,
          Effect,
          Resource,
        },
      ],
    },
    context: {
      platformRoles: 'Login User',
      userId: '2',
      // aqui podria buscar el id del usuario relacionado al token pero en
      // este punto no tenemos alguna validacion de usuario con cognito o algo asi,
      // por lo que se pone un id quemado
    },
  };
};
const validateToken = async (token) => {
  const TOKEN_AUTH_VALIDE = process.env.TOKEN_AUTH;
  return TOKEN_AUTH_VALIDE === token;
};
const authorizerFunc = async (event) => {
  const token: string = event.authorizationToken;
  const validate = await validateToken(token);

  if (validate) return generatePolicy({ token });
  throw Error('Authorizer error');
};
module.exports = { authorizerFunc };

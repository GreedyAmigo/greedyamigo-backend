import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

function getUserId(request: any): string {
  const authorization = request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
  }

  throw new AuthenticationError('You are not authenticated!');
}

export { getUserId };

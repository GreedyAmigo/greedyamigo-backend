import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

function getUserId(request: any): string {
  const authorization = request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (err) {
      throw new AuthenticationError('You are not authenticated!');
    }
  }

  throw new AuthenticationError('You are not authenticated!');
}

export { getUserId };

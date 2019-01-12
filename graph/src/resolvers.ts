import { AuthenticationError } from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getUserId } from './utils';

const resolvers = {
  Query: {
    async me(root, args, context) {
      const userId = getUserId(context.req);
      if (!userId) {
        throw new AuthenticationError('You are not authenticated!');
      }

      return context.prisma.user({ id: userId });
    },
    async login(root, args, context) {
      const user = await context.prisma.user({ email: args.email });
      if (!user) {
        throw new AuthenticationError('No user with that email!');
      }

      const valid = await bcrypt.compareSync(args.password, user.password);
      if (!valid) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = jwt.sign({ id: user.id, email: user.email },
                             process.env.JWT_SECRET,
                             { expiresIn: '1y' });

      return {
        token,
        user,
      };
    },
  },
  Mutation: {
    async signup(root, args, context) {
      const password = bcrypt.hashSync(args.password, 10);
      const user = await context.prisma.createUser({ ...args, password });
      const token = jwt.sign({ id: user.id, email: user.email },
                             process.env.JWT_SECRET,
                             { expiresIn: '1y' });

      return {
        token,
        user,
      };
    },
  },
};

export { resolvers };

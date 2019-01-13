import { QueryResolvers } from '../generated/graphqlgen';
import { AuthenticationError } from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getUserId } from '../utils';

// tslint:disable-next-line:variable-name
export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  me: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.user({ id: userId });
  },
  login: async (parent, args, ctx) => {
    const user = await ctx.prisma.user({ email: args.email });
    if (!user) {
      throw new AuthenticationError('No user with that email!');
    }

    const valid = bcrypt.compareSync(args.password, user.password);
    if (!valid) {
      throw new AuthenticationError('Incorrect password!');
    }

    const token = jwt.sign({ id: user.id, email: user.email },
                           Buffer.from(process.env.JWT_SECRET).toString('base64'),
                           { expiresIn: '1y' });

    return {
      token,
      user,
    };
  },
  anonymousUsers: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.anonymousUsers({ where: { user: { id: userId } } });
  },
  things: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.user({ id: userId }).things();
  },
  currency: (parent, args, ctx) => {
    getUserId(ctx.req);
    return ctx.prisma.currency({ Abbreviation: args.abbreviation });
  },
  currencies: (parent, args, ctx) => {
    getUserId(ctx.req);
    return ctx.prisma.currencies();
  },
  moneyLendings: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.moneyLendings({ where: { owner: { id: userId } } });
  },
  thingLendings: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.thingLendings({ where: { owner: { id: userId } } });
  },
};

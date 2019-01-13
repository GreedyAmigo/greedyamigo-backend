import { UserResolvers } from '../generated/graphqlgen';
import { getUserId } from '../utils';

// tslint:disable-next-line:variable-name
export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  things: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.user({ id: userId }).things();
  },
  anonymousUsers: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.user({ id: userId }).anonymousUsers();
  },
  moneyLendings: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.user({ id: userId }).moneyLendings();
  },
  thingLendings: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.user({ id: userId }).thingLendings();
  },
};

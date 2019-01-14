import { MoneyLendingResolvers } from '../generated/graphqlgen';

// tslint:disable-next-line:variable-name
export const MoneyLending: MoneyLendingResolvers.Type = {
  ...MoneyLendingResolvers.defaultResolvers,

  currency: (parent, args, ctx) => {
    return ctx.prisma.moneyLending({ id: parent.id }).currency();
  },
  owner: (parent, args, ctx) => {
    return ctx.prisma.moneyLending({ id: parent.id }).owner();
  },
  participant: (parent, args, ctx) => {
    return ctx.prisma.moneyLending({ id: parent.id }).participant();
  },
};

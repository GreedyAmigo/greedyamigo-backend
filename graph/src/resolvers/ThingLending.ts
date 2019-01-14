import { ThingLendingResolvers } from '../generated/graphqlgen';

// tslint:disable-next-line:variable-name
export const ThingLending: ThingLendingResolvers.Type = {
  ...ThingLendingResolvers.defaultResolvers,

  thing: (parent, args, ctx) => {
    return ctx.prisma.thingLending({ id: parent.id }).thing();
  },
  owner: (parent, args, ctx) => {
    return ctx.prisma.thingLending({ id: parent.id }).owner();
  },
  participant: (parent, args, ctx) => {
    return ctx.prisma.thingLending({ id: parent.id }).participant();
  },
};

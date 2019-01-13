import { ThingResolvers } from '../generated/graphqlgen';

// tslint:disable-next-line:variable-name
export const Thing: ThingResolvers.Type = {
  ...ThingResolvers.defaultResolvers,

  user: (parent, args, ctx) => {
    return ctx.prisma.thing({ id: parent.id }).user();
  },
};

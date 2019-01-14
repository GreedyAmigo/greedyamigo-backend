import { AnonymousUserResolvers } from '../generated/graphqlgen';

// tslint:disable-next-line:variable-name
export const AnonymousUser: AnonymousUserResolvers.Type = {
  ...AnonymousUserResolvers.defaultResolvers,

  user: (parent, args, ctx) => {
    return ctx.prisma.anonymousUser({ id: parent.id }).user();
  },
};

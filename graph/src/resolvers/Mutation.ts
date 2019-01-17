import { MutationResolvers } from '../generated/graphqlgen';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as PasswordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';
import { getUserId } from '../utils';

// tslint:disable-next-line:variable-name
export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (parent, args, ctx) => {
    const schema = new PasswordValidator();

    schema
      .is().min(6)
      .is().max(255)
      .has().digits()
      .has().not().spaces()
      .is().not().oneOf(['Passw0rd', 'Password123', 'password']);

    if (schema.validate(args.password)) {
      if (EmailValidator.validate(args.email)) {
        const password = bcrypt.hashSync(args.password, 10);
        const user = await ctx.prisma.createUser({ ...args, password });
        const token = jwt.sign({ id: user.id, email: args.email },
                               process.env.JWT_SECRET,
                               { expiresIn: '1y' });

        return {
          token,
          user,
        };
      }

      throw new UserInputError('Invalid email format!');
    }

    throw new UserInputError("Password doesn't match the requirements (Min: 6, Max: 255, 1 digit, no spaces)!");

  },
  createAnonymousUser: (parent, args, ctx) => {
    const email = getUserId(ctx.req);
    return ctx.prisma.createAnonymousUser(
      {
        ...args,
        user:
        {
          connect:
          {
            id: email,
          },
        },
      });
  },

  createThing: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.createThing({
      ...args,
      user:
      {
        connect:
        {
          id: userId,
        },
      },
    });
  },

  createMoneyLending: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.createMoneyLending(
      {
        dueDate: args.dueDate,
        amount: args.amount,
        description: args.description,
        isBorrowed: args.isBorrowed,
        owner: { connect: { id: userId } },
        participant: { connect: { id: args.participantId } },
        currency: { connect: { id: args.currencyId } },
      });
  },
  createThingLending: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.createThingLending(
      {
        dueDate: args.dueDate,
        emoji: args.emoji,
        description: args.description,
        isBorrowed: args.isBorrowed,
        owner: { connect: { id: userId } },
        participant: { connect: { id: args.participantId } },
        thing: { connect: { id: args.thingId } },
      });
  },
  deleteAnonymousUser: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const anonymousUserExists = await ctx.prisma.$exists.anonymousUser(
      {
        AND:
        [
          {
            user:
            {
              id: userId,
            },
          },
          {
            id: args.userId,
          },
        ],
      });

    if (anonymousUserExists) {
      return ctx.prisma.deleteAnonymousUser(
        {
          id: args.userId,
        },
      );
    }

    throw new UserInputError(`Anonymous user with id ${args.userId} does not exist or isn't connected to user!`);
  },
  deleteThing: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const thingExists = await ctx.prisma.$exists.thing({
      AND:
      [
        {
          user:
          {
            id: userId,
          },

        },
        {
          id: args.thingId,
        },
      ],
    });

    if (thingExists) {
      return ctx.prisma.deleteThing(
        {
          id: args.thingId,
        });
    }

    throw new UserInputError(`Thing with id ${args.thingId} does not exist or isn't connected to user!`);
  },
  deleteMoneyLending: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const moneyLendingExists = await ctx.prisma.$exists.moneyLending({
      AND: [
        {
          owner:
          {
            id: userId,
          },
        },
        {
          id: args.moneyLendingId,
        },
      ],
    });

    if (moneyLendingExists) {
      return ctx.prisma.deleteMoneyLending(
        {
          id: args.moneyLendingId,
        });
    }

    throw new UserInputError(`Money lending with id ${args.moneyLendingId} does not exist or isn't connected to user!`);
  },
  deleteThingLending: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const thingLendingExists = await ctx.prisma.$exists.thingLending({
      AND: [
        {
          owner:
          {
            id: userId,
          },
        },
        {
          id: args.thingLendingId,
        },
      ],
    });

    if (thingLendingExists) {
      return ctx.prisma.deleteThingLending(
        {
          id: args.thingLendingId,
        });
    }

    throw new UserInputError(`Thing lending with id ${args.thingLendingId} does not exist or isn't connected to user!`);
  },
  updateThing: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const thingExists = await ctx.prisma.$exists.thing({
      AND: [
        {
          user:
          {
            id: userId,
          },
        },
        {
          id: args.id,
        },
      ],
    });

    if (thingExists) {
      return ctx.prisma.updateThing({
        data:
        {
          label: args.label,
        },
        where:
        {
          id: args.id,
        },
      });
    }

    throw new UserInputError(`Thing with id ${args.id} does not exist or isn't connected to user!`);
  },
  updateMoneyLending: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const moneyLendingExists = await ctx.prisma.$exists.moneyLending(
      {
        AND:
        [
          {
            owner:
            {
              id: userId,
            },
          },
          {
            id: args.id,
          },
        ],
      });

    if (moneyLendingExists && args.participantId !== undefined && args.currencyId !== undefined) {
      return ctx.prisma.updateMoneyLending({
        data:
        {
          amount: args.amount,
          cleared: args.cleared,
          description: args.description,
          isBorrowed: args.isBorrowed,
          dueDate: args.dueDate,
          participant: { connect: { id: args.participantId } },
          currency: { connect: { id: args.currencyId } },
        },
        where:
        {
          id: args.id,
        },
      });
    }

    throw new UserInputError(`Money lending with id ${args.id} does not exist or isn't connected to user!`);
  },
  updateThingLending: async (parent, args, ctx) => {
    const userId = getUserId(ctx.req);

    const thingLendingExists = await ctx.prisma.$exists.thingLending(
      {
        AND:
        [
          {
            owner:
            {
              id: userId,
            },
          },
          {
            id: args.id,
          },
        ],
      });

    if (thingLendingExists && args.participantId !== undefined && args.thingId !== undefined) {
      return ctx.prisma.updateThingLending({
        data:
        {
          emoji: args.emoji,
          cleared: args.cleared,
          description: args.description,
          isBorrowed: args.isBorrowed,
          dueDate: args.dueDate,
          participant: { connect: { id: args.participantId } },
          thing: { connect: { id: args.thingId } },
        },
        where:
        {
          id: args.id,
        },
      });
    }

    throw new UserInputError(`Thing lending with id ${args.id} does not exist or isn't connected to user!`);
  },
};

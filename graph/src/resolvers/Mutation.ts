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
    return ctx.prisma.createAnonymousUser({ ...args, user:{ connect: { id: email } } });
  },
  createThing: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.createThing({
      ...args,
      user: { connect: { id: userId } },
    });
  },
  createMoneyLending: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.createMoneyLending({
      dueDate: args.dueDate,
      amount: args.amount,
      description: args.description,
      isBorrowed: args.isBorrowed,
      owner: { connect: { id:userId } },
      participant: { connect: { id:args.participantId } },
      currency: { connect: { id:args.currencyId } },
    });
  },
  createThingLending: (parent, args, ctx) => {
    const userId = getUserId(ctx.req);
    return ctx.prisma.createThingLending({
      dueDate: args.dueDate,
      emoji: args.emoji,
      description: args.description,
      isBorrowed: args.isBorrowed,
      owner: { connect: { id:userId } },
      participant: { connect: { id:args.participantId } },
      thing: { connect: { id:args.thingId } },
    });
  },
};

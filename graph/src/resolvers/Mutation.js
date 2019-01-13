"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utils_1 = require("../utils");
// tslint:disable-next-line:variable-name
exports.Mutation = Object.assign({}, graphqlgen_1.MutationResolvers.defaultResolvers, { signup: (parent, args, ctx) => __awaiter(this, void 0, void 0, function* () {
        const password = bcrypt.hashSync(args.password, 10);
        const user = yield ctx.prisma.createUser(Object.assign({}, args, { password }));
        const token = jwt.sign({ id: user.id, email: args.email }, process.env.JWT_SECRET, { expiresIn: '1y' });
        return {
            token,
            user,
        };
    }), createAnonymousUser: (parent, args, ctx) => {
        const email = utils_1.getUserId(ctx.req);
        return ctx.prisma.createAnonymousUser(Object.assign({}, args, { user: { connect: { id: email } } }));
    }, createThing: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.createThing(Object.assign({}, args, { user: { connect: { id: userId } } }));
    }, createMoneyLending: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.createMoneyLending({
            dueDate: args.dueDate,
            amount: args.amount,
            description: args.description,
            isBorrowed: args.isBorrowed,
            owner: { connect: { id: userId } },
            participant: { connect: { id: args.participantId } },
            currency: { connect: { id: args.currencyId } },
        });
    }, createThingLending: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.createThingLending({
            dueDate: args.dueDate,
            emoji: args.emoji,
            description: args.description,
            isBorrowed: args.isBorrowed,
            owner: { connect: { id: userId } },
            participant: { connect: { id: args.participantId } },
            thing: { connect: { id: args.thingId } },
        });
    } });
//# sourceMappingURL=Mutation.js.map
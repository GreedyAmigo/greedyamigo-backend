"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
const apollo_server_1 = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utils_1 = require("../utils");
// tslint:disable-next-line:variable-name
exports.Query = Object.assign({}, graphqlgen_1.QueryResolvers.defaultResolvers, { me: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.user({ id: userId });
    }, login: (parent, args, ctx) => {
        const user = ctx.prisma.user({ email: args.email });
        if (!user) {
            throw new apollo_server_1.AuthenticationError('No user with that email!');
        }
        const valid = bcrypt.compareSync(args.password, user.password);
        if (!valid) {
            throw new apollo_server_1.AuthenticationError('Incorrect password!');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, Buffer.from(process.env.JWT_SECRET).toString('base64'), { expiresIn: '1y' });
        return {
            token,
            user,
        };
    }, anonymousUsers: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.anonymousUsers({ where: { user: { id: userId } } });
    }, things: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.user({ id: userId }).things();
    }, currency: (parent, args, ctx) => {
        utils_1.getUserId(ctx.req);
        return ctx.prisma.currency({ Abbreviation: args.abbreviation });
    }, currencies: (parent, args, ctx) => {
        utils_1.getUserId(ctx.req);
        return ctx.prisma.currencies();
    }, moneyLendings: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.moneyLendings({ where: { owner: { id: userId } } });
    }, thingLendings: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.thingLendings({ where: { owner: { id: userId } } });
    } });
//# sourceMappingURL=Query.js.map
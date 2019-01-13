"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
const utils_1 = require("../utils");
// tslint:disable-next-line:variable-name
exports.User = Object.assign({}, graphqlgen_1.UserResolvers.defaultResolvers, { things: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.user({ id: userId }).things();
    }, anonymousUsers: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.user({ id: userId }).anonymousUsers();
    }, moneyLendings: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.user({ id: userId }).moneyLendings();
    }, thingLendings: (parent, args, ctx) => {
        const userId = utils_1.getUserId(ctx.req);
        return ctx.prisma.user({ id: userId }).thingLendings();
    } });
//# sourceMappingURL=User.js.map
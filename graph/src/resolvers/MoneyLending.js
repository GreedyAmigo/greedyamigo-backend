"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
// tslint:disable-next-line:variable-name
exports.MoneyLending = Object.assign({}, graphqlgen_1.MoneyLendingResolvers.defaultResolvers, { currency: (parent, args, ctx) => {
        return ctx.prisma.moneyLending({ id: parent.id }).currency();
    }, owner: (parent, args, ctx) => {
        return ctx.prisma.moneyLending({ id: parent.id }).owner();
    }, participant: (parent, args, ctx) => {
        return ctx.prisma.moneyLending({ id: parent.id }).participant();
    } });
//# sourceMappingURL=MoneyLending.js.map
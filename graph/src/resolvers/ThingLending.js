"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
// tslint:disable-next-line:variable-name
exports.ThingLending = Object.assign({}, graphqlgen_1.ThingLendingResolvers.defaultResolvers, { thing: (parent, args, ctx) => {
        return ctx.prisma.thingLending({ id: parent.id }).thing();
    }, owner: (parent, args, ctx) => {
        return ctx.prisma.thingLending({ id: parent.id }).owner();
    }, participant: (parent, args, ctx) => {
        return ctx.prisma.thingLending({ id: parent.id }).participant();
    } });
//# sourceMappingURL=ThingLending.js.map
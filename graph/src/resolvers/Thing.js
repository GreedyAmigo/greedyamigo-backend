"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
// tslint:disable-next-line:variable-name
exports.Thing = Object.assign({}, graphqlgen_1.ThingResolvers.defaultResolvers, { user: (parent, args, ctx) => {
        return ctx.prisma.thing({ id: parent.id }).user();
    } });
//# sourceMappingURL=Thing.js.map
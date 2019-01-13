"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlgen_1 = require("../generated/graphqlgen");
// tslint:disable-next-line:variable-name
exports.AnonymousUser = Object.assign({}, graphqlgen_1.AnonymousUserResolvers.defaultResolvers, { user: (parent, args, ctx) => {
        return ctx.prisma.anonymousUser({ id: parent.id }).user();
    } });
//# sourceMappingURL=AnonymousUser.js.map
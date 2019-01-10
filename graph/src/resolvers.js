"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {},
    Mutation: {
        createUser(root, args, context) {
            return context.prisma.createUser({ firstName: args.firstName, lastName: args.lastName, email: args.email });
        }
    }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map
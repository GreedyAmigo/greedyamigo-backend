const resolvers = {
    Query: {
    },

    Mutation: {
        createUser(root, args, context) {
            return context.prisma.createUser(
                {firstName: args.firstName, lastName: args.lastName, email: args.email}
            )
        }
    }
};

export {resolvers};
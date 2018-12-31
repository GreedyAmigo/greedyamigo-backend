import {ApolloServer} from "apollo-server";

const typeDefs = `
type Query {
  info: String!
}
`;

const resolvers = {
    Query: {
        info: () => `This is the API of Greedy Amigo`
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
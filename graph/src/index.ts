import {ApolloServer} from "apollo-server-express";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as path from "path";
import * as http from "http";

const configurations = {
    production: {port: 80, hostname: 'greedy-amigo.com'},
    development: {port: 4000, hostname: 'localhost'}
};

const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

const typeDefs = `
type Query {
  info: String!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;

const resolvers = {
    Query: {
        info: () => `This is the API of Greedy Amigo`
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();
apolloServer.applyMiddleware({app});
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

let server = http.createServer(app)
apolloServer.installSubscriptionHandlers(server);

server.listen({port: config.port}, () =>
    console.log(
        '🚀 Server ready at',
        `http://${config.hostname}:${config.port}${apolloServer.graphqlPath}`
    )
);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_import_1 = require("graphql-import");
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const favicon = require("serve-favicon");
const resolvers_1 = require("./resolvers");
const prisma_client_1 = require("./generated/prisma-client");
dotenv.config();
const configurations = {
    production: { port: 80, hostname: 'graph.greedy-amigo.com' },
    development: { port: 4000, hostname: 'localhost' }
};
const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];
const app = express();
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: graphql_import_1.importSchema(path.join(__dirname, 'schema.graphql')),
    resolvers: resolvers_1.resolvers,
    introspection: true,
    context: ({ req }) => {
        return {
            req: req,
            prisma: prisma_client_1.prisma
        };
    }
});
apolloServer.applyMiddleware({ app });
let server = http.createServer(app);
apolloServer.installSubscriptionHandlers(server);
app.listen({ port: 4000 }, () => console.log('🚀 Server ready at', `http://${config.hostname}:${config.port}${apolloServer.graphqlPath}`));
//# sourceMappingURL=index.js.map
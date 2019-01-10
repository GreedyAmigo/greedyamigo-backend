"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_import_1 = require("graphql-import");
const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwksClient = require("jwks-rsa");
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
const client = jwksClient({
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
});
function getKey(header, cb) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
}
const options = {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256']
};
const app = express();
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'public')));
function getUser(req, token) {
    if (req.body.operationName != "IntrospectionQuery" || true) {
        const user = new Promise((resolve, reject) => {
            jwt.verify(token, getKey, options, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                else {
                    resolve(decoded);
                }
            });
        });
        return null;
    }
}
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: graphql_import_1.importSchema(path.join(__dirname, 'schema.graphql')),
    resolvers: resolvers_1.resolvers,
    context: ({ req }) => {
        const token = req.headers.authentication;
        return {
            prisma: prisma_client_1.prisma,
            user: getUser(req, token)
        };
    }
});
apolloServer.applyMiddleware({ app });
let server = http.createServer(app);
apolloServer.installSubscriptionHandlers(server);
server.listen({ port: 4000 }, () => console.log('🚀 Server ready at', `http://${config.hostname}:${config.port}${apolloServer.graphqlPath}`));
//# sourceMappingURL=index.js.map
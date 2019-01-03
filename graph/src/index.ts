import {ApolloServer} from "apollo-server-express";
import * as https from "https";
import * as express from "express";
import * as fs from "fs";
import * as http from "http";

const configurations = {
    production: {ssl: true, port: 443, hostname: 'greedy-amigo.com'},
    development: {ssl: false, port: 4000, hostname: 'localhost'}
};

const environment = process.env.NODE_ENV || 'production';
console.log("Enviornment:"+ environment);
const config = configurations[environment];

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

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();
apolloServer.applyMiddleware({app});

let server;
if (config.ssl) {
    server = https.createServer(
        {
            key: fs.readFileSync("/etc/letsencrypt/archive/greedy-amigo.com/privkey1.pem"),
            cert: fs.readFileSync("/etc/letsencrypt/archive/greedy-amigo.com/fullchain1.pem"),
            ca: fs.readFileSync("/etc/letsencrypt/archive/greedy-amigo.com/chain1.pem")
        },
        app
    )
} else {
    server = http.createServer(app)
}

apolloServer.installSubscriptionHandlers(server);

server.listen({port: config.port}, () =>
    console.log(
        '🚀 Server ready at',
        `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apolloServer.graphqlPath}`
    )
);
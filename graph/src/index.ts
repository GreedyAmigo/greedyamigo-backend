import {ApolloServer} from "apollo-server-express";
import { importSchema } from "graphql-import";
import * as express from "express";
import * as http from "http";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as jwksClient from "jwks-rsa";
import * as path from "path";
import * as favicon from "serve-favicon";
import {resolvers} from "./resolvers";
import {prisma, User} from "./generated/prisma-client";

dotenv.config();
const configurations = {
    production: {port: 80, hostname: 'graph.greedy-amigo.com'},
    development: {port: 4000, hostname: 'localhost'}
};

const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

const client = jwksClient({
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
});

function getKey(header, cb){
    client.getSigningKey(header.kid, function(err, key) {
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

function getUser(req: any, token: string): User {
    if (req.body.operationName != "IntrospectionQuery" || true) {
        const user = new Promise((resolve, reject) => {
            jwt.verify(token, getKey, options, (error, decoded) => {
                if(error) {
                    return reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });

        return null;
    }
}

const apolloServer = new ApolloServer({
    typeDefs: importSchema(path.join(__dirname, 'schema.graphql')),
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authentication;
        return {
            prisma: prisma,
            user: getUser(req, token)
        };
    }
});

apolloServer.applyMiddleware({app});
let server = http.createServer(app);
apolloServer.installSubscriptionHandlers(server);

server.listen({port: 4000}, () =>
    console.log(
        '🚀 Server ready at',
        `http://${config.hostname}:${config.port}${apolloServer.graphqlPath}`
    )
);
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import * as express from 'express';
import * as http from 'http';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as https from 'https';
import * as fs from 'fs';
import { prisma } from './generated/prisma-client';
import { Mutation } from './resolvers/Mutation';
import { Query } from './resolvers/Query';
import { User } from './resolvers/User';
import { Thing } from './resolvers/Thing';
import { AnonymousUser } from './resolvers/AnonymousUser';
import { ThingLending } from './resolvers/ThingLending';
import { MoneyLending } from './resolvers/MoneyLending';

dotenv.config();
const configurations = {
  production: { ssl: true, hostname: 'graph.greedy-amigo.com' },
  development: { ssl: false, hostname: 'localhost' },
};

const port = 4000;
const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

const resolvers = {
  AnonymousUser,
  MoneyLending,
  Mutation,
  Query,
  Thing,
  ThingLending,
  User,
};

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs: importSchema(path.join(__dirname, 'schema.graphql')),
  introspection: true,
  context: ({ req }) => {
    return {
      req,
      prisma,
    };
  },
});

apolloServer.applyMiddleware({ app });
let server;
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/graph.greedy-amigo.com/privkey.key'),
      cert: fs.readFileSync('/etc/letsencrypt/live/graph.greedy-amigo.com/cert.crt'),
    },
    app,
  );
} else {
  server = http.createServer(app);
}
apolloServer.installSubscriptionHandlers(server);

app.listen({ port }, () =>
    console.log(
        '🚀 Server ready at',
        `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apolloServer.graphqlPath}`,
    ),
);

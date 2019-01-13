import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import * as express from 'express';
import * as http from 'http';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import { resolvers } from './resolvers';
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
  production: { port: 80, hostname: 'graph.greedy-amigo.com' },
  development: { port: 4000, hostname: 'localhost' },
};

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
const server = http.createServer(app);
apolloServer.installSubscriptionHandlers(server);

app.listen({ port: 4000 }, () =>
    console.log(
        '🚀 Server ready at',
        `http://${config.hostname}:${config.port}${apolloServer.graphqlPath}`,
    ),
);

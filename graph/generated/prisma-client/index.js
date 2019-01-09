"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "AnonymousUser",
    embedded: false
  },
  {
    name: "Currency",
    embedded: false
  },
  {
    name: "MoneyLending",
    embedded: false
  },
  {
    name: "Reminder",
    embedded: false
  },
  {
    name: "Thing",
    embedded: false
  },
  {
    name: "ThingLending",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();

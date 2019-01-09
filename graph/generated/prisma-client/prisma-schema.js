module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAnonymousUser {
  count: Int!
}

type AggregateCurrency {
  count: Int!
}

type AggregateMoneyLending {
  count: Int!
}

type AggregateReminder {
  count: Int!
}

type AggregateThing {
  count: Int!
}

type AggregateThingLending {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AnonymousUser {
  id: ID!
  firstName: String
  lastName: String
}

type AnonymousUserConnection {
  pageInfo: PageInfo!
  edges: [AnonymousUserEdge]!
  aggregate: AggregateAnonymousUser!
}

input AnonymousUserCreateInput {
  firstName: String
  lastName: String
}

type AnonymousUserEdge {
  node: AnonymousUser!
  cursor: String!
}

enum AnonymousUserOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AnonymousUserPreviousValues {
  id: ID!
  firstName: String
  lastName: String
}

type AnonymousUserSubscriptionPayload {
  mutation: MutationType!
  node: AnonymousUser
  updatedFields: [String!]
  previousValues: AnonymousUserPreviousValues
}

input AnonymousUserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AnonymousUserWhereInput
  AND: [AnonymousUserSubscriptionWhereInput!]
  OR: [AnonymousUserSubscriptionWhereInput!]
  NOT: [AnonymousUserSubscriptionWhereInput!]
}

input AnonymousUserUpdateInput {
  firstName: String
  lastName: String
}

input AnonymousUserUpdateManyMutationInput {
  firstName: String
  lastName: String
}

input AnonymousUserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  AND: [AnonymousUserWhereInput!]
  OR: [AnonymousUserWhereInput!]
  NOT: [AnonymousUserWhereInput!]
}

input AnonymousUserWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

type Currency {
  symbol: String!
  Name: String!
  Abbreviation: String!
}

type CurrencyConnection {
  pageInfo: PageInfo!
  edges: [CurrencyEdge]!
  aggregate: AggregateCurrency!
}

input CurrencyCreateInput {
  symbol: String!
  Name: String!
  Abbreviation: String!
}

input CurrencyCreateOneInput {
  create: CurrencyCreateInput
  connect: CurrencyWhereUniqueInput
}

type CurrencyEdge {
  node: Currency!
  cursor: String!
}

enum CurrencyOrderByInput {
  symbol_ASC
  symbol_DESC
  Name_ASC
  Name_DESC
  Abbreviation_ASC
  Abbreviation_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CurrencyPreviousValues {
  symbol: String!
  Name: String!
  Abbreviation: String!
}

type CurrencySubscriptionPayload {
  mutation: MutationType!
  node: Currency
  updatedFields: [String!]
  previousValues: CurrencyPreviousValues
}

input CurrencySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CurrencyWhereInput
  AND: [CurrencySubscriptionWhereInput!]
  OR: [CurrencySubscriptionWhereInput!]
  NOT: [CurrencySubscriptionWhereInput!]
}

input CurrencyUpdateInput {
  symbol: String
  Name: String
  Abbreviation: String
}

input CurrencyUpdateManyMutationInput {
  symbol: String
  Name: String
  Abbreviation: String
}

input CurrencyWhereInput {
  symbol: String
  symbol_not: String
  symbol_in: [String!]
  symbol_not_in: [String!]
  symbol_lt: String
  symbol_lte: String
  symbol_gt: String
  symbol_gte: String
  symbol_contains: String
  symbol_not_contains: String
  symbol_starts_with: String
  symbol_not_starts_with: String
  symbol_ends_with: String
  symbol_not_ends_with: String
  Name: String
  Name_not: String
  Name_in: [String!]
  Name_not_in: [String!]
  Name_lt: String
  Name_lte: String
  Name_gt: String
  Name_gte: String
  Name_contains: String
  Name_not_contains: String
  Name_starts_with: String
  Name_not_starts_with: String
  Name_ends_with: String
  Name_not_ends_with: String
  Abbreviation: String
  Abbreviation_not: String
  Abbreviation_in: [String!]
  Abbreviation_not_in: [String!]
  Abbreviation_lt: String
  Abbreviation_lte: String
  Abbreviation_gt: String
  Abbreviation_gte: String
  Abbreviation_contains: String
  Abbreviation_not_contains: String
  Abbreviation_starts_with: String
  Abbreviation_not_starts_with: String
  Abbreviation_ends_with: String
  Abbreviation_not_ends_with: String
  AND: [CurrencyWhereInput!]
  OR: [CurrencyWhereInput!]
  NOT: [CurrencyWhereInput!]
}

input CurrencyWhereUniqueInput {
  Abbreviation: String
}

scalar DateTime

scalar Long

type MoneyLending {
  amount: Int!
  currency: Currency!
}

type MoneyLendingConnection {
  pageInfo: PageInfo!
  edges: [MoneyLendingEdge]!
  aggregate: AggregateMoneyLending!
}

input MoneyLendingCreateInput {
  amount: Int!
  currency: CurrencyCreateOneInput!
}

input MoneyLendingCreateManyInput {
  create: [MoneyLendingCreateInput!]
}

type MoneyLendingEdge {
  node: MoneyLending!
  cursor: String!
}

enum MoneyLendingOrderByInput {
  amount_ASC
  amount_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MoneyLendingPreviousValues {
  amount: Int!
}

input MoneyLendingScalarWhereInput {
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  AND: [MoneyLendingScalarWhereInput!]
  OR: [MoneyLendingScalarWhereInput!]
  NOT: [MoneyLendingScalarWhereInput!]
}

type MoneyLendingSubscriptionPayload {
  mutation: MutationType!
  node: MoneyLending
  updatedFields: [String!]
  previousValues: MoneyLendingPreviousValues
}

input MoneyLendingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MoneyLendingWhereInput
  AND: [MoneyLendingSubscriptionWhereInput!]
  OR: [MoneyLendingSubscriptionWhereInput!]
  NOT: [MoneyLendingSubscriptionWhereInput!]
}

input MoneyLendingUpdateManyDataInput {
  amount: Int
}

input MoneyLendingUpdateManyInput {
  create: [MoneyLendingCreateInput!]
  deleteMany: [MoneyLendingScalarWhereInput!]
  updateMany: [MoneyLendingUpdateManyWithWhereNestedInput!]
}

input MoneyLendingUpdateManyMutationInput {
  amount: Int
}

input MoneyLendingUpdateManyWithWhereNestedInput {
  where: MoneyLendingScalarWhereInput!
  data: MoneyLendingUpdateManyDataInput!
}

input MoneyLendingWhereInput {
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  currency: CurrencyWhereInput
  AND: [MoneyLendingWhereInput!]
  OR: [MoneyLendingWhereInput!]
  NOT: [MoneyLendingWhereInput!]
}

type Mutation {
  createAnonymousUser(data: AnonymousUserCreateInput!): AnonymousUser!
  updateAnonymousUser(data: AnonymousUserUpdateInput!, where: AnonymousUserWhereUniqueInput!): AnonymousUser
  updateManyAnonymousUsers(data: AnonymousUserUpdateManyMutationInput!, where: AnonymousUserWhereInput): BatchPayload!
  upsertAnonymousUser(where: AnonymousUserWhereUniqueInput!, create: AnonymousUserCreateInput!, update: AnonymousUserUpdateInput!): AnonymousUser!
  deleteAnonymousUser(where: AnonymousUserWhereUniqueInput!): AnonymousUser
  deleteManyAnonymousUsers(where: AnonymousUserWhereInput): BatchPayload!
  createCurrency(data: CurrencyCreateInput!): Currency!
  updateCurrency(data: CurrencyUpdateInput!, where: CurrencyWhereUniqueInput!): Currency
  updateManyCurrencies(data: CurrencyUpdateManyMutationInput!, where: CurrencyWhereInput): BatchPayload!
  upsertCurrency(where: CurrencyWhereUniqueInput!, create: CurrencyCreateInput!, update: CurrencyUpdateInput!): Currency!
  deleteCurrency(where: CurrencyWhereUniqueInput!): Currency
  deleteManyCurrencies(where: CurrencyWhereInput): BatchPayload!
  createMoneyLending(data: MoneyLendingCreateInput!): MoneyLending!
  updateManyMoneyLendings(data: MoneyLendingUpdateManyMutationInput!, where: MoneyLendingWhereInput): BatchPayload!
  deleteManyMoneyLendings(where: MoneyLendingWhereInput): BatchPayload!
  createReminder(data: ReminderCreateInput!): Reminder!
  updateManyReminders(data: ReminderUpdateManyMutationInput!, where: ReminderWhereInput): BatchPayload!
  deleteManyReminders(where: ReminderWhereInput): BatchPayload!
  createThing(data: ThingCreateInput!): Thing!
  updateThing(data: ThingUpdateInput!, where: ThingWhereUniqueInput!): Thing
  updateManyThings(data: ThingUpdateManyMutationInput!, where: ThingWhereInput): BatchPayload!
  upsertThing(where: ThingWhereUniqueInput!, create: ThingCreateInput!, update: ThingUpdateInput!): Thing!
  deleteThing(where: ThingWhereUniqueInput!): Thing
  deleteManyThings(where: ThingWhereInput): BatchPayload!
  createThingLending(data: ThingLendingCreateInput!): ThingLending!
  deleteManyThingLendings(where: ThingLendingWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  anonymousUser(where: AnonymousUserWhereUniqueInput!): AnonymousUser
  anonymousUsers(where: AnonymousUserWhereInput, orderBy: AnonymousUserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AnonymousUser]!
  anonymousUsersConnection(where: AnonymousUserWhereInput, orderBy: AnonymousUserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnonymousUserConnection!
  currency(where: CurrencyWhereUniqueInput!): Currency
  currencies(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Currency]!
  currenciesConnection(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CurrencyConnection!
  moneyLendings(where: MoneyLendingWhereInput, orderBy: MoneyLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MoneyLending]!
  moneyLendingsConnection(where: MoneyLendingWhereInput, orderBy: MoneyLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MoneyLendingConnection!
  reminders(where: ReminderWhereInput, orderBy: ReminderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Reminder]!
  remindersConnection(where: ReminderWhereInput, orderBy: ReminderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReminderConnection!
  thing(where: ThingWhereUniqueInput!): Thing
  things(where: ThingWhereInput, orderBy: ThingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Thing]!
  thingsConnection(where: ThingWhereInput, orderBy: ThingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThingConnection!
  thingLendings(where: ThingLendingWhereInput, orderBy: ThingLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ThingLending]!
  thingLendingsConnection(where: ThingLendingWhereInput, orderBy: ThingLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThingLendingConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Reminder {
  dateTime: DateTime
}

type ReminderConnection {
  pageInfo: PageInfo!
  edges: [ReminderEdge]!
  aggregate: AggregateReminder!
}

input ReminderCreateInput {
  dateTime: DateTime
}

type ReminderEdge {
  node: Reminder!
  cursor: String!
}

enum ReminderOrderByInput {
  dateTime_ASC
  dateTime_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ReminderPreviousValues {
  dateTime: DateTime
}

type ReminderSubscriptionPayload {
  mutation: MutationType!
  node: Reminder
  updatedFields: [String!]
  previousValues: ReminderPreviousValues
}

input ReminderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReminderWhereInput
  AND: [ReminderSubscriptionWhereInput!]
  OR: [ReminderSubscriptionWhereInput!]
  NOT: [ReminderSubscriptionWhereInput!]
}

input ReminderUpdateManyMutationInput {
  dateTime: DateTime
}

input ReminderWhereInput {
  dateTime: DateTime
  dateTime_not: DateTime
  dateTime_in: [DateTime!]
  dateTime_not_in: [DateTime!]
  dateTime_lt: DateTime
  dateTime_lte: DateTime
  dateTime_gt: DateTime
  dateTime_gte: DateTime
  AND: [ReminderWhereInput!]
  OR: [ReminderWhereInput!]
  NOT: [ReminderWhereInput!]
}

type Subscription {
  anonymousUser(where: AnonymousUserSubscriptionWhereInput): AnonymousUserSubscriptionPayload
  currency(where: CurrencySubscriptionWhereInput): CurrencySubscriptionPayload
  moneyLending(where: MoneyLendingSubscriptionWhereInput): MoneyLendingSubscriptionPayload
  reminder(where: ReminderSubscriptionWhereInput): ReminderSubscriptionPayload
  thing(where: ThingSubscriptionWhereInput): ThingSubscriptionPayload
  thingLending(where: ThingLendingSubscriptionWhereInput): ThingLendingSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Thing {
  label: String!
  thingLendings(where: ThingLendingWhereInput, orderBy: ThingLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ThingLending!]
}

type ThingConnection {
  pageInfo: PageInfo!
  edges: [ThingEdge]!
  aggregate: AggregateThing!
}

input ThingCreateInput {
  label: String!
}

input ThingCreateManyInput {
  create: [ThingCreateInput!]
  connect: [ThingWhereUniqueInput!]
}

input ThingCreateOneWithoutThingLendingsInput {
  create: ThingCreateWithoutThingLendingsInput
  connect: ThingWhereUniqueInput
}

input ThingCreateWithoutThingLendingsInput {
  label: String!
}

type ThingEdge {
  node: Thing!
  cursor: String!
}

type ThingLending {
  thing: Thing!
}

type ThingLendingConnection {
  pageInfo: PageInfo!
  edges: [ThingLendingEdge]!
  aggregate: AggregateThingLending!
}

input ThingLendingCreateInput {
  thing: ThingCreateOneWithoutThingLendingsInput!
}

input ThingLendingCreateManyInput {
  create: [ThingLendingCreateInput!]
}

type ThingLendingEdge {
  node: ThingLending!
  cursor: String!
}

enum ThingLendingOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ThingLendingSubscriptionPayload {
  mutation: MutationType!
  node: ThingLending
  updatedFields: [String!]
}

input ThingLendingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ThingLendingWhereInput
  AND: [ThingLendingSubscriptionWhereInput!]
  OR: [ThingLendingSubscriptionWhereInput!]
  NOT: [ThingLendingSubscriptionWhereInput!]
}

input ThingLendingUpdateManyInput {
  create: [ThingLendingCreateInput!]
}

input ThingLendingWhereInput {
  thing: ThingWhereInput
  AND: [ThingLendingWhereInput!]
  OR: [ThingLendingWhereInput!]
  NOT: [ThingLendingWhereInput!]
}

enum ThingOrderByInput {
  label_ASC
  label_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ThingPreviousValues {
  label: String!
}

input ThingScalarWhereInput {
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  AND: [ThingScalarWhereInput!]
  OR: [ThingScalarWhereInput!]
  NOT: [ThingScalarWhereInput!]
}

type ThingSubscriptionPayload {
  mutation: MutationType!
  node: Thing
  updatedFields: [String!]
  previousValues: ThingPreviousValues
}

input ThingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ThingWhereInput
  AND: [ThingSubscriptionWhereInput!]
  OR: [ThingSubscriptionWhereInput!]
  NOT: [ThingSubscriptionWhereInput!]
}

input ThingUpdateDataInput {
  label: String
}

input ThingUpdateInput {
  label: String
}

input ThingUpdateManyDataInput {
  label: String
}

input ThingUpdateManyInput {
  create: [ThingCreateInput!]
  update: [ThingUpdateWithWhereUniqueNestedInput!]
  upsert: [ThingUpsertWithWhereUniqueNestedInput!]
  delete: [ThingWhereUniqueInput!]
  connect: [ThingWhereUniqueInput!]
  disconnect: [ThingWhereUniqueInput!]
  deleteMany: [ThingScalarWhereInput!]
  updateMany: [ThingUpdateManyWithWhereNestedInput!]
}

input ThingUpdateManyMutationInput {
  label: String
}

input ThingUpdateManyWithWhereNestedInput {
  where: ThingScalarWhereInput!
  data: ThingUpdateManyDataInput!
}

input ThingUpdateWithWhereUniqueNestedInput {
  where: ThingWhereUniqueInput!
  data: ThingUpdateDataInput!
}

input ThingUpsertWithWhereUniqueNestedInput {
  where: ThingWhereUniqueInput!
  update: ThingUpdateDataInput!
  create: ThingCreateInput!
}

input ThingWhereInput {
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  thingLendings_every: ThingLendingWhereInput
  thingLendings_some: ThingLendingWhereInput
  thingLendings_none: ThingLendingWhereInput
  AND: [ThingWhereInput!]
  OR: [ThingWhereInput!]
  NOT: [ThingWhereInput!]
}

input ThingWhereUniqueInput {
  label: String
}

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  things(where: ThingWhereInput, orderBy: ThingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Thing!]
  moneyLendings(where: MoneyLendingWhereInput, orderBy: MoneyLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MoneyLending!]
  thingLendings(where: ThingLendingWhereInput, orderBy: ThingLendingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ThingLending!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  firstName: String
  lastName: String
  email: String
  things: ThingCreateManyInput
  moneyLendings: MoneyLendingCreateManyInput
  thingLendings: ThingLendingCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  firstName: String
  lastName: String
  email: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  firstName: String
  lastName: String
  email: String
  things: ThingUpdateManyInput
  moneyLendings: MoneyLendingUpdateManyInput
  thingLendings: ThingLendingUpdateManyInput
}

input UserUpdateManyMutationInput {
  firstName: String
  lastName: String
  email: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  things_every: ThingWhereInput
  things_some: ThingWhereInput
  things_none: ThingWhereInput
  moneyLendings_every: MoneyLendingWhereInput
  moneyLendings_some: MoneyLendingWhereInput
  moneyLendings_none: MoneyLendingWhereInput
  thingLendings_every: ThingLendingWhereInput
  thingLendings_some: ThingLendingWhereInput
  thingLendings_none: ThingLendingWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    
import gql from "graphql-tag";

const typeDefs = gql`
      type Todo {
        userId: Int!
        title: String!
      }

      type Query {
        myTodos: [Todo]
      }

      type Mutation {
        addTodo (title: String!): Todo
      }
    `;

export {typeDefs};
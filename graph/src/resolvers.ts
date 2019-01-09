import {AuthenticationError} from "apollo-server";

const todos:{userId: number, title: string}[] = [];

const resolvers = {
    Query: {
        myTodos: async (_, args, {user}) => {
            try {
                const email = await user;

                return todos.filter(todo => todo.userId === user.sub)
            } catch(e) {
                throw new AuthenticationError('You must be logged in to do this');
            }
        }
    },

    Mutation: {
        addTodo: async (_, {title}, {user}) => {
            try {
                const email = await user;

                todos.push({
                    userId: user.sub,
                    title
                });

                return todos.filter(todo => todo.userId === user.sub && todo.title === title)
            } catch(e) {
                throw new AuthenticationError('You must be logged in to do this');
            }
        }
    }
};

export {resolvers};
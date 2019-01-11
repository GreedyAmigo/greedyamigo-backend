"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils_1 = require("./utils");
const resolvers = {
    Query: {
        me(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const userId = utils_1.getUserId(context.req);
                if (!userId) {
                    throw new apollo_server_1.AuthenticationError('You are not authenticated!');
                }
                return context.prisma.user({ id: userId });
            });
        },
        login(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield context.prisma.user({ email: args.email });
                if (!user) {
                    throw new apollo_server_1.AuthenticationError('No user with that email!');
                }
                const valid = yield bcrypt.compare(args.password, user.password);
                if (!valid) {
                    throw new apollo_server_1.AuthenticationError('Incorrect password!');
                }
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' });
                return {
                    token,
                    user,
                };
            });
        }
    },
    Mutation: {
        signup(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const password = yield bcrypt.hash(args.password, 10);
                const user = yield context.prisma.createUser(Object.assign({}, args, { password: password }));
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' });
                return {
                    token,
                    user,
                };
            });
        }
    }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map
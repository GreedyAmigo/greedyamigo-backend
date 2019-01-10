import {Prisma, User} from './generated/prisma-client';

interface Context {
    prisma: Prisma;
    user: User;
}

export {Context};
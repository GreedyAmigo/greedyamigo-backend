import {Prisma, User} from './generated/prisma-client';
import * as express from "express";

interface Context {
    prisma: Prisma;
    req: express.Request;
}

interface AuthPayload {
    token: string
}


export {Context, AuthPayload};
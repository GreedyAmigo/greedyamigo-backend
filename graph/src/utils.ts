import * as jwt from "jsonwebtoken";
import {AuthenticationError} from "apollo-server";

function getUserId(request: any): string {
    const Authorization = request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        return id
    }

    throw new AuthenticationError('You are not authenticated!');
}

export {getUserId}
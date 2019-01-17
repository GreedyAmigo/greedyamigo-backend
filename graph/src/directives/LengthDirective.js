"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
class LengthDirective extends graphql_tools_1.SchemaDirectiveVisitor {
    visitInputFieldDefinition(field) {
        this.wrapType(field);
    }
    visitFieldDefinition(field) {
        this.wrapType(field);
    }
    wrapType(field) {
        if (field.type instanceof graphql_1.GraphQLNonNull && field.type.ofType instanceof graphql_1.GraphQLScalarType) {
            field.type = new graphql_1.GraphQLNonNull(new LimitedLengthType(field.type.ofType, this.args.min, this.args.max));
        }
        else if (field.type instanceof graphql_1.GraphQLScalarType) {
            field.type = new LimitedLengthType(field.type, this.args.min, this.args.max);
        }
        else {
            throw new Error(`Not a scalar type: ${field.type}`);
        }
    }
}
exports.LengthDirective = LengthDirective;
class LimitedLengthType extends graphql_1.GraphQLScalarType {
    constructor(type, minLength, maxLength) {
        super({
            name: `LengthAtMost${maxLength}AndLeast${minLength}`,
            serialize(value) {
                const serializedValue = type.serialize(value);
                console.log(serializedValue.length <= maxLength);
                assert.ok(serializedValue.length <= maxLength);
                assert.ok(serializedValue.length >= minLength);
                return serializedValue;
            },
            parseValue(value) {
                return type.parseValue(value);
            },
            parseLiteral(ast) {
                return type.parseLiteral(ast);
            },
        });
    }
}
//# sourceMappingURL=LengthDirective.js.map
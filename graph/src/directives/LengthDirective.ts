import * as assert from 'assert';
import { DirectiveLocation, GraphQLScalarType, GraphQLNonNull, GraphQLDirective } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export class LengthDirective extends SchemaDirectiveVisitor {

  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  visitFieldDefinition(field) {
    this.wrapType(field);
  }

  wrapType(field) {
    if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
      field.type = new GraphQLNonNull(new LimitedLengthType(field.type.ofType, this.args.min, this.args.max));
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new LimitedLengthType(field.type, this.args.min, this.args.max);
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}

class LimitedLengthType extends GraphQLScalarType {
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

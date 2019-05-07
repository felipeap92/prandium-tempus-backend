import { createSchema } from 'src/utils/create-schema';
import { GraphQLSchema, graphql } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';

interface GCallOptions {
    source: string;
    context: any;
    variableValues?: Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const gCall = async (args: GCallOptions) => {
    if (!schema) {
        schema = await createSchema(false);
    }

    return graphql({ schema, ...args });
};

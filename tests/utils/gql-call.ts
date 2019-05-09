import { createSchema } from '../../src/utils/create-schema';
import { GraphQLSchema, graphql } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';

/**
 * Defines GraphQL Call options.
 */
interface GqlCallOptions {
    /**
     * GraphQL call query or mutation operation.
     */
    source: string;

    /**
     * GraphQL call context object.
     */
    context: any;

    /**
     * GraphQL call variables to be used when the call is made.
     */
    variables?: Maybe<{ [key: string]: any }>;
}

/**
 * Instance of the GraphQL schema. This is used to cache the schema created.
 */
let schema: GraphQLSchema;

/**
 * Do a GraphQL call based on the options passed by.
 *
 * @param options - GraphQL Call options.
 * @returns A Promise that returns an object containing the GraphQL call response.
 */
export const gqlCall = async (options: GqlCallOptions) => {
    if (!schema) {
        schema = await createSchema(false);
    }

    return graphql(schema, options.source, null, options.context, options.variables);
};

import { GraphQLSchema, graphql, GraphQLError } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';

import { createSchema } from '../../src/utils/create-schema';
import context from '../mock/graphql-context';

/**
 * Instance of the GraphQL schema. This is used to cache the crated schema.
 */
let schema: GraphQLSchema;

/**
 * Used to test a complete GraphQL operation call (quary and mutation).
 */
export default (testName: string, testCases: GraphQLTestCase[]) => {
    describe(testName, () => {
        testCases.forEach((testCase) => {
            const { name, source, variables, expected } = testCase;
            test(name, async () => {
                const result = await graphql(schema || (schema = await createSchema(false)), source, null, context, variables);
                expect(result).toEqual(expected);
            });
        });
    });
};

/**
 * Defines GraphQL test case object.
 */
export interface GraphQLTestCase {
    /**
     * GraphQL test case name.
     */
    name: string;

    /**
     * GraphQL test case query or mutation operation.
     */
    source: string;

    /**
     * GraphQL test case variables to be used when the call is made.
     */
    variables?: Maybe<{ [key: string]: any }>;

    /**
     * GraphQL test case expected result.
     */
    expected: Maybe<{ [key: string]: any }>;
}

/**
 * GraphQL response errors as a `GraphQLError` object.
 */
export const error = {
    variableRequired: (variable: string, type: string) => (
        new GraphQLError(`Variable "$${variable}" of required type "${type}" was not provided.`)
    ),
    operationWithoutArgs: (field: string, type: string) => (
        new GraphQLError(`Field "${field}" of type "${type}" must have a selection of subfields. Did you mean "${field} { ... }"?`)
    ),
    uniqueConstraintViolated: (field: string, type: string) => (
        new GraphQLError(`A unique constraint would be violated on ${type}. Details: Field name = ${field}`)
    ),
    argumentValidationError: () => (
        new GraphQLError('Argument Validation Error')
    ),
};

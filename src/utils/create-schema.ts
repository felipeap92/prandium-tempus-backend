import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

/**
 * Creates the final GraphQL schema loading all the resolvers automatically.
 *
 * @remarks
 * All resolvers script file name must end with `.resolver.ts`.
 *
 * @param emitSchemaFile - `true` to export the generated GraphQL schema, otherwise `false`.
 * @returns A Promise that returns a GraphQLSchema object.
 */
export const createSchema = (emitSchemaFile: string | boolean = true) => {
    const pathExtension = (process.env.NODE_ENV === 'production' ? 'js' : 'ts');
    const path = `${__dirname}/../**/*.resolver.${pathExtension}`;
    return buildSchema({
        resolvers: [path],
        emitSchemaFile,
    });
};

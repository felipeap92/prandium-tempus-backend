import { buildSchema } from 'type-graphql';

export const createSchema = (emitSchemaFile: boolean = true) => {
    return buildSchema({
        resolvers: [__dirname + '/../**/*.resolver.ts'],
        emitSchemaFile,
    });
};

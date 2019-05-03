import { GraphQLServer } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';

import { prisma } from './generated/prisma-client';
import UserResolver from './user/user.resolver';

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: true,
    });

    const server = new GraphQLServer({
        schema,
        context: { prisma },
    });

    const options = server.options;
    options.port = 4001;
    server.start(options, () => console.log("Server is running on http://localhost:4001"));
}

bootstrap();

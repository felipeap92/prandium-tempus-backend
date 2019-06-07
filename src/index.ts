import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import { prisma } from './generated/prisma-client';
import { createSchema } from './utils/create-schema';

async function bootstrap() {
    const schema = await createSchema();
    const server = new ApolloServer({
        schema,
        context: { prisma },
        playground: true,
    });

    // Start the server
    const port = process.env.PORT || 4000;
    const { url } = await server.listen(port);
    // tslint:disable-next-line: no-console
    console.log(`Server is running at ${url}`);
}

bootstrap();

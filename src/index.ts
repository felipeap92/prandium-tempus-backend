import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';

import { prisma } from './generated/prisma-client';
import { createSchema } from './utils/create-schema';

async function bootstrap() {
    const schema = await createSchema();
    const server = new GraphQLServer({
        schema,
        context: { prisma },
    });

    const options = server.options;
    options.port = 4001;
    // tslint:disable-next-line: no-console
    server.start(options, () => console.log('Server is running on http://localhost:4001'));
}

bootstrap();

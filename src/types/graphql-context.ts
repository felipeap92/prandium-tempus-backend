import { Prisma } from 'src/generated/prisma-client';

/**
 * Contains GraphQL context object definition.
 */
export interface GraphQLContext {
    /**
     * Generated Prisma client.
     */
    prisma: Prisma;
}

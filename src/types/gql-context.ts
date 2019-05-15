import { Prisma } from 'src/generated/prisma-client';

/**
 * Contains GraphQL context object definition.
 */
export interface GqlContext {
    /**
     * Generated Prisma client.
     */
    prisma: Prisma;
}

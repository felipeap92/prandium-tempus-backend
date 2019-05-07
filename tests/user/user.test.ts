
import { graphql } from 'graphql';
import { buildSchema } from 'type-graphql';

import UserResolver from './user.resolver';
import User from './user';

describe('Validation', () => {
    test('should pass input validation when data without optional field is correct', async () => {
        const query = `query {
            getAllUsers{
                name
                email
                profileImg
          }
        } `;

        const schema = await buildSchema({
            resolvers: [UserResolver],
        });
        const result = await graphql(schema, query, null, {
            prisma: {
                users: () => [{ name: 'Test', email: 'teste@sample.com', profileImg: 'aew' } as User],
            },
        });

        expect(result.data).toEqual({getAllUsers: [{ name: 'Test', email: 'teste@sample.com', profileImg: 'aew' } as User]});
    });

    test('aaa', async () => {
        expect(1).toEqual(1);
    });

});

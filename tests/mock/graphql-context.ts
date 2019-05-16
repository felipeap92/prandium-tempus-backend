import { users } from './user';
import User from '../../src/user/user';
import { error } from '../utils/graphql-call';

export default {
    prisma: {
        users: () => users,
        user: ({ email }: { email: string }) => users.find((user) => user.email === email),
        createUser: ({ name, email, profileImg }: { name: string, email: string, profileImg?: string }) => {
            if (users.find((user) => user.email === email)) {
                return error.uniqueConstraintViolated('email', 'User');
            }

            return new User(name, email, profileImg);
        },
    },
};

import { users } from './user';

export default {
    prisma: {
        users: () => users,
        user: ({ email }: { email: string }) => users.find((user) => user.email === email),
    },
};

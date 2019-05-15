import * as faker from 'faker';
import User from '../../src/user/user';
import { users } from '../mock/user';
import context from '../mock/gql-context';
import { gqlCall } from '../utils/gql-call';

describe('User Tests', () => {
    describe('Query "user(email: $email)" Tests', () => {
        const testCases = [{
            name: 'With all fields',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                            email
                            profileImg
                        }
                    }`,
            variables: { email: users[0].email },
            expected: { user: { name: users[0].name, email: users[0].email, profileImg: users[0].profileImg } as User },
        }, {
            name: 'Only with "name" field',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                        }
                    }`,
            variables: { email: users[0].email },
            expected: { user: { name: users[0].name } as User },
        }, {
            name: 'Only with "email" field',
            source: `query User($email: String!) {
                        user(email: $email) {
                            email
                        }
                    }`,
            variables: { email: users[0].email },
            expected: { user: { email: users[0].email } as User },
        }, {
            name: 'Only with "profileImg" field',
            source: `query User($email: String!) {
                        user(email: $email) {
                            profileImg
                        }
                    }`,
            variables: { email: users[0].email },
            expected: { user: { profileImg: users[0].profileImg } as User },
        }, {
            name: 'Without args',
            source: `query User($email: String!) {
                        user(email: $email) {
                            profileImg
                        }
                    }`,
            variables: {},
            expected: undefined,
        }, {
            name: 'Invalid user',
            source: `query User($email: String!) {
                        user(email: $email) {
                            profileImg
                        }
                    }`,
            variables: { email: 'invalid.user@invalid.com' },
            expected: { user: null },
        }];

        testCases.forEach((testCase) => {
            const { name, source, variables, expected } = testCase;
            test(name, async () => {
                const result = await gqlCall({ source, context, variables });
                expect(result.data).toEqual(expected);
            });
        });
    });

    describe('Query "users" Tests', () => {
        const testCases = [{
            name: 'With all fields',
            source: `query {
                        users {
                            name
                            email
                            profileImg
                        }
                    }`,

            variables: {},
            expected: { users: users.map((user) => ({ name: user.name, email: user.email, profileImg: user.profileImg } as User)) },
        }, {
            name: 'Only with "name" field',
            source: `query {
                        users {
                            name
                        }
                    }`,

            variables: {},
            expected: { users: users.map((user) => ({ name: user.name })) },
        }, {
            name: 'Only with "email" field',
            source: `query {
                        users {
                            email
                        }
                    }`,

            variables: {},
            expected: { users: users.map((user) => ({ email: user.email })) },
        }, {
            name: 'Only with "profileImg" field',
            source: `query {
                        users {
                            profileImg
                        }
                    }`,
            variables: {},
            expected: { users: users.map((user) => ({ profileImg: user.profileImg })) },
        }, {
            name: 'With args',
            source: `query {
                        users {
                            profileImg
                        }
                    }`,
            variables: { email: faker.internet.email },
            expected: { users: users.map((user) => ({ profileImg: user.profileImg })) },
        }];

        testCases.forEach((testCase) => {
            const { name, source, variables, expected } = testCase;
            test(name, async () => {
                const result = await gqlCall({ source, context, variables });
                expect(result.data).toEqual(expected);
            });
        });
    });
});

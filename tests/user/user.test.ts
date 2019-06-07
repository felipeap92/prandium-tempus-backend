import * as faker from 'faker';

import User from '../../src/user/user';
import GraphQLCall, { GraphQLTestCase } from '../utils/graphql-call';
import { users } from '../mock/user';
import { error } from '../utils/graphql-call';

describe('User Tests', () => {
    const mockUser = users[Math.floor(Math.random() * users.length)];
    const mockSignUpUser = new User('Test User', 'test.user@gmail.com', faker.internet.avatar());
    const queryUserTestCases: GraphQLTestCase[] = [
        {
            name: 'With all fields',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                            email
                            profileImg
                        }
                    }`,
            variables: { email: mockUser.email },
            expected: { data: { user: { name: mockUser.name, email: mockUser.email, profileImg: mockUser.profileImg } as User } },
        }, {
            name: 'Only with "name" field',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                        }
                    }`,
            variables: { email: mockUser.email },
            expected: { data: { user: { name: mockUser.name } as User } },
        }, {
            name: 'Only with "email" field',
            source: `query User($email: String!) {
                        user(email: $email) {
                            email
                        }
                    }`,
            variables: { email: mockUser.email },
            expected: { data: { user: { email: mockUser.email } as User } },
        }, {
            name: 'Only with "profileImg" field',
            source: `query User($email: String!) {
                        user(email: $email) {
                            profileImg
                        }
                    }`,
            variables: { email: mockUser.email },
            expected: { data: { user: { profileImg: mockUser.profileImg } as User } },
        }, {
            name: 'Without fields',
            source: `query User($email: String!) {
                        user(email: $email)
                    }`,
            variables: {},
            expected: {
                errors: [
                    error.operationWithoutArgs('user', 'User'),
                ],
            },
        }, {
            name: 'With inexistent user',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                        }
                    }`,
            variables: { email: 'invalid.user@invalid.com' },
            expected: { data: { user: null } },
        }, {
            name: 'With invalid "email"',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                        }
                    }`,
            variables: { email: 'this is not an email!' },
            expected: {
                data: { user: null },
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With empty "email"',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                        }
                    }`,
            variables: { email: '' },
            expected: {
                data: { user: null },
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'Without args',
            source: `query User($email: String!) {
                        user(email: $email) {
                            name
                        }
                    }`,
            variables: {},
            expected: {
                errors: [
                    error.variableRequired('email', 'String!'),
                ],
            },
        },
    ];
    const queryUsersTestCases = [
        {
            name: 'With all fields',
            source: `query {
                        users {
                            name
                            email
                            profileImg
                        }
                    }`,
            variables: {},
            expected: { data: { users: users.map((user) => ({ name: user.name, email: user.email, profileImg: user.profileImg } as User)) } },
        }, {
            name: 'Only with "name" field',
            source: `query {
                        users {
                            name
                        }
                    }`,
            variables: {},
            expected: { data: { users: users.map((user) => ({ name: user.name })) } },
        }, {
            name: 'Only with "email" field',
            source: `query {
                        users {
                            email
                        }
                    }`,
            variables: {},
            expected: { data: { users: users.map((user) => ({ email: user.email })) } },
        }, {
            name: 'Only with "profileImg" field',
            source: `query {
                        users {
                            profileImg
                        }
                    }`,
            variables: {},
            expected: { data: { users: users.map((user) => ({ profileImg: user.profileImg })) } },
        }, {
            name: 'Without fields',
            source: `query {
                        users
                    }`,
            variables: {},
            expected: {
                errors: [
                    error.operationWithoutArgs('users', '[User!]!'),
                ],
            },
        }, {
            name: 'With args',
            source: `query {
                        users {
                            profileImg
                        }
                    }`,
            variables: { email: faker.internet.email },
            expected: { data: { users: users.map((user) => ({ profileImg: user.profileImg })) } },
        },
    ];
    const mutationSingUpTestCases = [
        {
            name: 'With all fields',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                            email
                            profileImg
                        }
                    }`,
            variables: { ...mockSignUpUser },
            expected: { data: { signUp: { name: mockSignUpUser.name, email: mockSignUpUser.email, profileImg: mockSignUpUser.profileImg } as User } },
        }, {
            name: 'Only with "name" field',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { ...mockSignUpUser },
            expected: { data: { signUp: { name: mockSignUpUser.name } as User } },
        }, {
            name: 'Only with "email" field',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            email
                        }
                    }`,
            variables: { ...mockSignUpUser },
            expected: { data: { signUp: { email: mockSignUpUser.email } as User } },
        }, {
            name: 'Only with "profileImg" field',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            profileImg
                        }
                    }`,
            variables: { ...mockSignUpUser },
            expected: { data: { signUp: { profileImg: mockSignUpUser.profileImg } as User } },
        }, {
            name: 'Without all args',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: {},
            expected: {
                errors: [
                    error.variableRequired('name', 'String!'),
                    error.variableRequired('email', 'String!'),
                ],
            },
        }, {
            name: 'Without "name" arg',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { email: mockSignUpUser.email },
            expected: {
                errors: [
                    error.variableRequired('name', 'String!'),
                ],
            },
        }, {
            name: 'Without "email" arg',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: mockSignUpUser.name },
            expected: {
                errors: [
                    error.variableRequired('email', 'String!'),
                ],
            },
        }, {
            name: 'Existed user',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { ...mockUser },
            expected: {
                data: null,
                errors: [
                    error.uniqueConstraintViolated('email', 'User'),
                ],
            },
        }, {
            name: 'With empty "name"',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: '', email: mockSignUpUser.email },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With invalid "name" - too short',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: 'A', email: mockSignUpUser.email },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With invalid "name" - too long',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: 'This Full Name Exceeds The Maximum Length Permitted And Should Be Denied', email: mockSignUpUser.email },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With invalid "email"',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: mockSignUpUser.name, email: 'this is not an email!' },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With empty "email"',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: mockSignUpUser.name, email: '' },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With invalid "profileImage"',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: mockSignUpUser.name, email: mockSignUpUser.email, profileImg: 'this is not profile image URL' },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        }, {
            name: 'With empty "profileImage"',
            source: `mutation SignUp($name: String!, $email: String!, $profileImg: String) {
                        signUp(name: $name, email: $email, profileImg: $profileImg) {
                            name
                        }
                    }`,
            variables: { name: mockSignUpUser.name, email: mockSignUpUser.email, profileImg: '' },
            expected: {
                data: null,
                errors: [
                    error.argumentValidationError(),
                ],
            },
        },
    ];

    GraphQLCall('Query "user(email: $email)" Tests', queryUserTestCases);
    GraphQLCall('Query "users" Tests', queryUsersTestCases);
    GraphQLCall('Mutation "signUp(name: $name, email: $email, profileImg: $profileImg)" Tests', mutationSingUpTestCases);
});

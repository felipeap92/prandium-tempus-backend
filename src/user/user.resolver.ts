import 'reflect-metadata';
import { Query, Resolver, Ctx, Mutation, Arg, Args } from 'type-graphql';

import User from './user';
import GetUserArgs from './get-user.args';
import UserSignUpArgs from './sign-up.args';
import { UserCreateInput } from 'src/generated/prisma-client';
import { GraphQLContext } from 'src/types/graphql-context';

@Resolver(User)
export default class UserResolver {
  @Query(() => User, { name: 'user', description: 'Returns an user by his email.', nullable: true })
  getUser(@Args() { email }: GetUserArgs, @Ctx() context: GraphQLContext): Promise<User | null> {
    return context.prisma.user({ email });
  }

  @Query(() => [User], { name: 'users', description: 'Returns all registered users.' })
  getAllUsers(@Ctx() context: GraphQLContext): Promise<User[]> {
    return context.prisma.users();
  }

  @Mutation(() => User, { name: 'signUp', description: 'Signup a new user.' })
  signUp(@Args() { name, email, profileImg }: UserSignUpArgs, @Ctx() context: GraphQLContext): Promise<User> {
    return context.prisma.createUser({ name, email, profileImg } as UserCreateInput);
  }
}

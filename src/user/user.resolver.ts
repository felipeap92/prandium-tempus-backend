import 'reflect-metadata';
import { Arg, Query, Resolver, Ctx, Mutation } from 'type-graphql';

import User from './user';
import { GraphQLContext } from 'src/types/graphql-context';
import { UserCreateInput } from 'src/generated/prisma-client';

@Resolver(User)
export default class UserResolver {
  @Query(() => User, { name: 'user', description: 'Returns an user by his email.', nullable: true })
  getUser(
    @Arg('email', { description: 'User email.' }) email: string,
    @Ctx() context: GraphQLContext,
  ): Promise<User | null> {
    return context.prisma.user({ email });
  }

  @Query(() => [User], { name: 'users', description: 'Returns all registered users.' })
  getAllUsers(@Ctx() context: GraphQLContext): Promise<User[]> {
    return context.prisma.users();
  }

  @Mutation(() => User, { name: 'signUp', description: 'Signup a new user.' })
  signUp(
    @Arg('name', { description: 'User full name.' }) name: string,
    @Arg('email', { description: 'User email.' }) email: string,
    @Arg('profileImg', { description: 'User profile image URL.', nullable: true }) profileImg: string,
    @Ctx() context: GraphQLContext,
  ): Promise<User> {
    return context.prisma.createUser({ name, email, profileImg } as UserCreateInput);
  }
}

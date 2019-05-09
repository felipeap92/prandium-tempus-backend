import 'reflect-metadata';
import { Arg, Query, Resolver, Ctx } from 'type-graphql';
import { Context } from 'graphql-yoga/dist/types';

import User from './user';

@Resolver(() => User)
export default class UserResolver {
  @Query(() => User, { name: 'user', description: 'Returns an user by his email.', nullable: true })
  getUser(@Arg('email', { description: 'User email.' }) email: string, @Ctx() context: Context) {
    return context.prisma.user({ email });
  }

  @Query(() => [User], { name: 'users', description: 'Returns all registered users.' })
  getAllUsers(@Ctx() context: Context) {
    return context.prisma.users();
  }
}

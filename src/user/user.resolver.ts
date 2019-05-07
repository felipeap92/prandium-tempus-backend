import 'reflect-metadata';
import { Arg, Query, Resolver, Ctx } from 'type-graphql';
import { Context } from 'graphql-yoga/dist/types';

import User from './user';

@Resolver(of => User)
export default class UserResolver {
  @Query(returns => User, { nullable: true })
  getUser(@Arg('email') email: string, @Ctx() context: Context) {
    return context.prisma.user({ email });
  }

  @Query(returns => [User])
  getAllUsers(@Ctx() context: Context) {
    return context.prisma.users();
  }
}

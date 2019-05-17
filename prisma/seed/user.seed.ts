import * as faker from 'faker';

import { prisma, UserCreateInput } from './../../src/generated/prisma-client';
import User from '../../src/user/user';

/**
 * Manages User seed.
 */
export class UserSeed {
  /**
   * Populates prisma database with fake users.
   */
  public static CreateUsers(): Promise<User[]> {
    const promises: Promise<User>[] = [];
    for (let count = 0; count < 25; count++) {
      const userFirstName = faker.name.firstName();
      const userLastName = faker.name.lastName();
      const user = new User(`${userFirstName} ${userLastName}`, faker.internet.email(userFirstName, userLastName), faker.internet.avatar());
      promises.push(prisma.createUser(user as UserCreateInput));
    }
    return Promise.all(promises);
  }
}

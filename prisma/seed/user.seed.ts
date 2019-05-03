import { prisma, UserCreateInput } from './../../src/generated/prisma-client';
import User from '../../src/user/user';

/**
 * Manages User seed.
 *
 * These fake users where created using: https://randomuser.me/api/
 */
export class UserSeed {
  /**
   * Populates prisma database with fake users.
   */
  public static CreateUsers(): Promise<User[]> {
    return Promise.all([
      prisma.createUser(new User('Christian Stevens', 'christian.stevens@example.com',
        'https://randomuser.me/api/portraits/men/40.jpg') as UserCreateInput),
      prisma.createUser(new User('Hadrien Blanchard', 'hadrien.blanchard@example.com',
        'https://randomuser.me/api/portraits/men/39.jpg') as UserCreateInput),
      prisma.createUser(new User('Robbert Bullens', 'robbert.bullens@example.com',
        'https://randomuser.me/api/portraits/men/32.jpg') as UserCreateInput),
      prisma.createUser(new User('Thea Jorgensen', 'thea.jorgensen@example.com',
        'https://randomuser.me/api/portraits/women/12.jpg') as UserCreateInput),
      prisma.createUser(new User('Elif Akyüz', 'elif.akyüz@example.com',
        'https://randomuser.me/api/portraits/women/10.jpg') as UserCreateInput),
      prisma.createUser(new User('Noelle Day', 'noelle.day@example.com',
        'https://randomuser.me/api/portraits/women/30.jpg') as UserCreateInput),
    ]);
  }
}
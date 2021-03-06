import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

/**
 * User model.
 */
@ObjectType({ description: 'User model.' })
export default class User {
  /**
   * User unique ID.
   */
  public id: string;

  /**
   * User full name.
   */
  @Field(() => String, { description: 'User full name.' })
  public name: string;

  /**
   * User email.
   *
   * @remarks
   * Mostly used for user identification and notification.
   */
  @Field(() => String, { description: 'User email. Mostly used for user identification and notification.' })
  public email: string;

  /**
   * User profile image URL.
   */
  @Field(() => String, { description: 'User profile image URL.', nullable: true })
  public profileImg?: string;

  /**
   * Date when user was created.
   */
  public createdAt: Date | string;

  constructor(name: string, email: string, profileImg?: string) {
    this.name = name;
    this.email = email;
    this.profileImg = profileImg;
  }
}

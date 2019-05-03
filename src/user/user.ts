import { Field, ObjectType } from 'type-graphql';

/**
 * User model.
 */
@ObjectType({ description: 'The user model' })
export default class User {
  /**
   * User name.
   */
  @Field(type => String)
  public name: string;

  /**
   * User email. Mostly used for user identification and notifications.
   */
  @Field(type => String)
  public email: string;

  /**
   * User profile image URL.
   */
  @Field(type => String, { nullable: true })
  public profileImg: string;

  constructor(name: string, email: string, profileImg?: string) {
    this.name = name;
    this.email = email;

    if (profileImg) {
      this.profileImg = profileImg;
    }
  }
}

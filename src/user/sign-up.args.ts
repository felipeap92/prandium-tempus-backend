import { ArgsType, Field } from 'type-graphql';
import { IsEmail, IsUrl, Length } from 'class-validator';

/**
 * Arguments used by SignUp GraphQL mutation operation.
 */
@ArgsType()
export default class SignUpArgs {
  /**
   * User full name.
   */
  @Field(() => String, { description: 'User full name.' })
  @Length(2, 60)
  public name: string;

  /**
   * User email.
   */
  @Field(() => String, { description: 'User email.' })
  @IsEmail()
  public email: string;

  /**
   * User profile image URL.
   */
  @Field(() => String, { description: 'User profile image URL.', nullable: true })
  @IsUrl()
  public profileImg?: string;
}

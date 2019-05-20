import { ArgsType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

/**
 * Arguments used by GetUser (user) GraphQL mutation operation.
 */
@ArgsType()
export default class GetUserArgs {
  /**
   * User email.
   */
  @Field(() => String, { description: 'User email.' })
  @IsEmail()
  public email: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCurrentUserInput {
  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The name of the user' })
  name: string;

  @Field({ description: 'The biography of the user', nullable: true })
  biography?: string;
}

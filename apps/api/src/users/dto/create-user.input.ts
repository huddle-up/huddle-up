import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The name of the user' })
  name: string;
}

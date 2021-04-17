import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class UpdateUserInput {
  @Field({ description: 'The id of the user' })
  id: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The name of the user' })
  name: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field({ description: 'The name of the tag' })
  name: string;
}

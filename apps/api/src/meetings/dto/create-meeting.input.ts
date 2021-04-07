import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMeetingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

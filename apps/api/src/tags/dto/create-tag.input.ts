import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field({ description: 'The name of the tag' })
  name: string;

  @Field(() => Boolean, { nullable: true, description: 'The flag indicating if predefined' })
  predefined?: boolean;
}

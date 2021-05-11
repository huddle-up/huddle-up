import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TagOption {
  @Field(() => Int, { nullable: true, description: 'The id of the tag' })
  id?: number;

  @Field({ nullable: true, description: 'The name of the tag' })
  name?: string;
}

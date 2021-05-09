import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => Int, { description: 'The id of the tag' })
  id: number;
}

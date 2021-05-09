import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Tag } from '../../tags/entities/tag.entity';

@InputType()
export class TagOption extends PartialType(Tag) {
  @Field(() => Int, { nullable: true, description: 'The id of the tag' })
  id?: number;

  @Field({ description: 'The name of the tag' })
  name: string;
}

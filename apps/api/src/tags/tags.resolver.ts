import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => Tag)
  createTag(@Args('input') input: CreateTagInput) {
    return this.tagsService.create(input);
  }

  @Query(() => [Tag], { name: 'tags' })
  findAll() {
    return this.tagsService.findAll();
  }

  @Query(() => Tag, { name: 'tag' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagsService.findOne({ id });
  }

  @Mutation(() => Tag)
  updateTag(@Args('input') input: UpdateTagInput) {
    return this.tagsService.update(input);
  }

  @Mutation(() => Boolean)
  removeTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagsService.remove(id);
  }
}

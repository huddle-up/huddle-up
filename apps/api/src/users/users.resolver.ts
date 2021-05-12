import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';
import { UpdateCurrentUserInput } from './dto/update-current-user.input';

@Resolver(() => User)
@UseGuards(JwtGqlAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne({ id });
  }

  @Query(() => User, { name: 'currentUser' })
  async currentUser(@CurrentUser() { userId }) {
    return this.usersService.findOne({ id: userId });
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    const { id, ...user } = input;
    return this.usersService.update(id, user);
  }

  @Mutation(() => User)
  async updateCurrentUser(@Args('input') input: UpdateCurrentUserInput, @CurrentUser() { userId }) {
    return this.usersService.update(userId, input);
  }
}

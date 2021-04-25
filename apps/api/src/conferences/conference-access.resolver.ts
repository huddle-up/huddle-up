import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';
import { UsersService } from '../users/users.service';
import { ConferencesService } from './conferences.service';
import { ConferenceAccess } from './models/conference-access.model';

@Resolver(() => ConferenceAccess)
@UseGuards(JwtGqlAuthGuard)
export class ConferenceAccessResolver {
  constructor(private readonly conferencesService: ConferencesService, private readonly usersService: UsersService) {}

  @Query(() => ConferenceAccess)
  async conferenceAccess(
    @Args('conferenceId', { type: () => String }) conferenceId: string,
    @CurrentUser() { userId }
  ) {
    const conference = await this.conferencesService.findOne({ id: conferenceId });
    if (!conference) {
      throw new NotFoundException(`Conference with id ${conferenceId} does not exist`);
    }
    const user = await this.usersService.findOne({ id: userId });
    const link = await this.conferencesService.getAccessLink(user, conference);
    return new ConferenceAccess(conferenceId, link);
  }
}

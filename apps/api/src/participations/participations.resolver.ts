import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';
import { CreateParticipationInput } from './dto/create-participation.input';
import { DeleteParticipationOutput } from './dto/delete-participation.output';
import { Participation } from './entities/participation.entity';
import { ParticipationsService } from './participations.service';

@Resolver(() => Participation)
@UseGuards(JwtGqlAuthGuard)
export class ParticipationsResolver {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Mutation(() => Participation)
  async createParticipation(@Args('input') input: CreateParticipationInput, @CurrentUser() authUser) {
    const { meetingId } = input;
    const userId = input.userId || authUser.userId;

    return this.participationsService.create({ meetingId, userId });
  }

  @Query(() => Participation, { name: 'userParticipation', nullable: true })
  async userParticipation(
    @CurrentUser() authUser,
    @Args('meetingId') meetingId: string,
    @Args('userId', { nullable: true }) userId?: string
  ) {
    return this.participationsService.findOne({ meetingId, userId: userId || authUser.id });
  }

  @Query(() => [Participation], { name: 'participations' })
  async participations(@Args('meetingId') meetingId: string) {
    return this.participationsService.find({ meetingId });
  }

  @Mutation(() => DeleteParticipationOutput, { name: 'deleteParticipation', nullable: true })
  async deleteParticipation(@Args('id') id: string, @CurrentUser() { userId }) {
    const participation = await this.participationsService.findOne({ id });
    if (participation && participation.userId !== userId) {
      throw new UnauthorizedException();
    }
    const success = await this.participationsService.remove(id);
    return success ? new DeleteParticipationOutput(id, participation.meetingId) : null;
  }
}

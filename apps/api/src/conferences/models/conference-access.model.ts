import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConferenceAccess {
  @Field({ description: 'The conference the url is for' })
  conferenceId: string;

  @Field({ description: 'The access url to join a conference' })
  url: string;

  constructor(conferenceId: string, url: string) {
    this.conferenceId = conferenceId;
    this.url = url;
  }
}

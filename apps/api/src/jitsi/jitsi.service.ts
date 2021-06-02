import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { Conference } from '../conferences/entities/conference.entity';
import { ConferenceProviderProps } from '../conferences/interfaces/conference-provider-props.interface';
import { ConferenceProvider } from '../conferences/interfaces/conference-provider.interface';
import { JitsiConfigService } from '../config/jitsi/config.service';
import { User } from '../users/entities/user.entity';
import { JitsiConferenceProps } from './interfaces/jitsi-conference-props.interface';

export interface CreateConnectionStringOptions {
  host: string;
  roomName: string;
  subject: string;
  userInfo?: {
    displayName?: string;
  };
  jwt?: string;
}

@Injectable()
export class JitsiService implements ConferenceProvider {
  constructor(private jitsiConfigService: JitsiConfigService) {}

  async create(conference: Conference): Promise<ConferenceProviderProps> {
    const subject = await this.createSubject(conference);
    return {
      roomName: `HuddleUp--${conference.id}`,
      subject,
    };
  }

  async update(conference: Conference): Promise<ConferenceProviderProps> {
    const jitsiProps = conference.providerProps as JitsiConferenceProps;
    const subject = await this.createSubject(conference);
    return {
      ...jitsiProps,
      subject,
    };
  }

  async publish(conference: Conference): Promise<ConferenceProviderProps> {
    return Promise.resolve(conference.providerProps);
  }

  async stop(conference: Conference): Promise<ConferenceProviderProps> {
    return Promise.resolve(conference.providerProps);
  }

  async getAccessLink(user: User, conference: Conference) {
    if (this.jitsiConfigService.jwt.enabled) {
      return this.getJwtAccessLink(user, conference);
    }
    return Promise.resolve(this.getPublicAccessLink(user, conference));
  }

  private getPublicAccessLink(user: User, conference: Conference) {
    const jitsiProps = conference.providerProps as JitsiConferenceProps;
    return this.createConnectionString({
      host: this.jitsiConfigService.host,
      roomName: jitsiProps.roomName,
      subject: jitsiProps.subject,
      userInfo: {
        displayName: user.name,
      },
    });
  }

  private async getJwtAccessLink(user: User, conference: Conference) {
    const jitsiProps = conference.providerProps as JitsiConferenceProps;
    const jwt = await this.createJwt(user, conference);
    return this.createConnectionString({
      host: this.jitsiConfigService.host,
      roomName: jitsiProps.roomName,
      subject: jitsiProps.subject,
      jwt,
      userInfo: {
        displayName: user.name,
      },
    });
  }

  private async createSubject(conference: Conference) {
    const meeting = await conference.meeting;
    return meeting.title;
  }

  private async createJwt(user: User, conference: Conference) {
    const meeting = await conference.meeting;
    const jitsiProps = conference.providerProps as JitsiConferenceProps;
    const content = {
      aud: 'jitsi',
      sub: this.jitsiConfigService.host,
      iss: this.jitsiConfigService.jwt.appId,
      room: jitsiProps.roomName,
      moderator: user.id === meeting.hostId,
      context: {
        user: {
          name: user.name,
          id: user.id,
          email: user.email,
        },
      },
    };
    return jsonwebtoken.sign(content, this.jitsiConfigService.jwt.secret);
  }

  private createConnectionString({ host, roomName, subject, userInfo, jwt }: CreateConnectionStringOptions) {
    const baseString = new URL(roomName, host);

    const hash = [`config.subject="${encodeURIComponent(subject)}"`];
    if (userInfo) {
      hash.push(`userInfo.displayName="${userInfo.displayName}"`);
    }
    baseString.hash = hash.join('&');

    if (jwt) {
      baseString.searchParams.set('jwt', jwt);
    }

    return baseString.toString();
  }
}

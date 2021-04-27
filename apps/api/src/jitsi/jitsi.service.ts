import { Injectable } from '@nestjs/common';
import { Conference } from '../conferences/entities/conference.entity';
import { JitsiConfigService } from '../config/jitsi/config.service';
import { User } from '../users/entities/user.entity';
import { JitsiConferenceProps } from './interfaces/jitsi-conference-props.interface';

interface CreateConnectionStringOptions {
  host: string;
  roomName: string;
  subject: string;
  userInfo?: {
    displayName?: string;
  };
}

@Injectable()
export class JitsiService {
  constructor(private jitsiConfigService: JitsiConfigService) {}

  async create(conference: Conference): Promise<JitsiConferenceProps> {
    const subject = await this.createSubject(conference);
    return {
      roomName: `HuddleUp--${conference.id}`,
      subject,
    };
  }

  async update(conference: Conference): Promise<JitsiConferenceProps> {
    const jitsiProps = conference.providerProps as JitsiConferenceProps;
    const subject = await this.createSubject(conference);
    return {
      ...jitsiProps,
      subject,
    };
  }

  async getAccessLink(user: User, conference: Conference) {
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

  private async createSubject(conference: Conference) {
    const meeting = await conference.meeting;
    return meeting.title;
  }

  private createConnectionString({ host, roomName, subject, userInfo }: CreateConnectionStringOptions) {
    const baseString = new URL(roomName, host);
    const hash = [`config.subject="${encodeURIComponent(subject)}"`];
    if (userInfo) {
      hash.push(`userInfo.displayName="${userInfo.displayName}"`);
    }
    baseString.hash = hash.join('&');
    return baseString.toString();
  }
}

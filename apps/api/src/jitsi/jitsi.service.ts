import { Injectable } from '@nestjs/common';
import { Conference } from '../conferences/entities/conference.entity';
import { JitsiConfigService } from '../config/jitsi/config.service';
import { User } from '../users/entities/user.entity';
import { JitsiConferenceProps } from './interfaces/jitsi-conference-props.interface';

interface CreateConnectionStringOptions {
  host: string;
  roomName: string;
  userInfo?: {
    displayName?: string;
  };
}

@Injectable()
export class JitsiService {
  constructor(private jitsiConfigService: JitsiConfigService) {}

  async create(conference: Conference): Promise<JitsiConferenceProps> {
    const roomName = await this.createRoomName(conference);
    return {
      roomName,
      host: this.jitsiConfigService.host,
    };
  }

  async getAccessLink(user: User, conference: Conference) {
    const jitsiProps = conference.providerProps as JitsiConferenceProps;
    return this.createConnectionString({
      host: jitsiProps.host,
      roomName: jitsiProps.roomName,
      userInfo: {
        displayName: user.name,
      },
    });
  }

  private async createRoomName(conference: Conference) {
    const meeting = await conference.meeting;
    return `${meeting.title.split(' ').join('')}--${meeting.id}`;
  }

  private createConnectionString({ host, roomName, userInfo }: CreateConnectionStringOptions) {
    const baseString = new URL(roomName, host);
    if (userInfo) {
      baseString.hash = `userInfo.displayName="${userInfo.displayName}"`;
    }
    return baseString.toString();
  }
}

import { User } from '../../users/entities/user.entity';
import { Conference } from '../entities/conference.entity';
import { ConferenceProviderProps } from './conference-provider-props.interface';

export const CONFERENCE_PROVIDER = 'ConferenceProvider';

export interface ConferenceProvider {
  create(conference: Conference): Promise<ConferenceProviderProps>;

  update(conference: Conference): Promise<ConferenceProviderProps>;

  publish(conference: Conference): Promise<ConferenceProviderProps>;

  stop(conference: Conference): Promise<ConferenceProviderProps>;

  getAccessLink(user: User, conference: Conference): Promise<string>;
}

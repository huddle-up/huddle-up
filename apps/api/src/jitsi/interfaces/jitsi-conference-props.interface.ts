import { ConferenceProviderProps } from '../../conferences/interfaces/conference-provider-props.interface';

export interface JitsiConferenceProps extends ConferenceProviderProps {
  roomName: string;
  subject: string;
}

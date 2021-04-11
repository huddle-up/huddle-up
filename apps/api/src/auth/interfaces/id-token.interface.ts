import { JwtPayload } from './jwt-payload.interface';

export interface IdToken extends JwtPayload {
  name?: string;
  email?: string;
}

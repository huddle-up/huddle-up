import { JwtPayload } from './jwt-payload.interface';

export interface OidcIdToken extends JwtPayload {
  name?: string;
  email?: string;
  nickname?: string;
  picture?: string;
  updated_at?: string;
}

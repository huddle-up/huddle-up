import { JwtPayload } from './jwt-payload.interface';

export interface IdTokenUserData {
  sub: string;
  userId: string;
  email?: string;
}

export interface IdToken extends JwtPayload, IdTokenUserData {}

import { JwtPayload } from './jwt-payload.interface';

export interface IdTokenUserData {
  userId: string;
  email?: string;
}

export interface IdToken extends JwtPayload, IdTokenUserData {}

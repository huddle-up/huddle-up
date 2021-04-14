export interface AuthEntity {
  sub: string;
  issuer: string;
  email: string;
  name?: string;
  nickname?: string;
  picture?: string;
}

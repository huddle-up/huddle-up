export interface IdToken {
  userId: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

import { JsonObject } from '../../common/interfaces/json-object.interface';

export interface JwtPayload extends JsonObject {
  sub: string;
  iss?: string;
  aud?: string[];
  iat?: number;
  exp?: number;
  azp?: string;
  scope?: string;
}

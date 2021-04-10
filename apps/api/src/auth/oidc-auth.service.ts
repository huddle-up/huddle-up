import { Injectable } from '@nestjs/common';
import { JwksClient } from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { AuthConfigService } from '../config/auth/config.service';
import { IdToken } from './interfaces/id-token.interface';

@Injectable()
export class OidcAuthService {
  private readonly jwksClient: JwksClient;

  constructor(private authConfigService: AuthConfigService) {
    this.jwksClient = new JwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
      jwksUri: `${authConfigService.oidcIssuer}.well-known/jwks.json`,
    });
  }

  public async verify(token: string): Promise<IdToken | null> {
    try {
      const getKey = (header, callback) => {
        this.jwksClient.getSigningKey(header.kid, (err, key) => {
          if (err || !key) {
            callback(err, null);
          } else {
            const signingKey = key.getPublicKey();
            callback(null, signingKey);
          }
        });
      };

      const result = await new Promise<IdToken | null>((resolve) => {
        jwt.verify(
          token,
          getKey,
          {
            issuer: this.authConfigService.oidcIssuer,
            audience: this.authConfigService.oidcAudience,
          },
          (err, decoded) => {
            if (err) {
              resolve(null);
            } else {
              resolve(decoded as IdToken);
            }
          }
        );
      });
      return result;
    } catch (e) {
      return null;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwksClient } from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { AuthConfigService } from '../config/auth/config.service';
import { OidcIdToken } from './interfaces/oidc-id-token.interface';
import { AuthEntity } from './interfaces/auth-entity.interface';

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

  public async verify(token: string): Promise<OidcIdToken | null> {
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

      const result = await new Promise<OidcIdToken | null>((resolve) => {
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
              resolve(decoded as OidcIdToken);
            }
          }
        );
      });
      return result;
    } catch (e) {
      return null;
    }
  }

  public toAuthEntity(oidcToken: OidcIdToken): AuthEntity {
    const { sub, iss, email, name, nickname, picture } = oidcToken;
    return {
      sub,
      issuer: iss,
      email,
      name,
      nickname,
      picture,
    };
  }
}

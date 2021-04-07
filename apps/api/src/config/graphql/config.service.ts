import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphqlConfigService {
  constructor(private configService: ConfigService) {}

  get playground(): boolean {
    return Boolean(this.configService.get<boolean>('graphql.playground'));
  }
}

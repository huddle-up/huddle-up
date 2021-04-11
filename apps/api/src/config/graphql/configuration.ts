import { registerAs } from '@nestjs/config';

export default registerAs('graphql', () => ({
  playground: process.env.HU_GRAPHQL_PLAYGROUND_ACTIVE,
}));

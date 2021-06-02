import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JitsiModule } from '../jitsi/jitsi.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { UsersModule } from '../users/users.module';
import { ConferenceAccessResolver } from './conference-access.resolver';
import { ConferenceResolver } from './conferences.resolver';
import { ConferencesService } from './conferences.service';
import { Conference } from './entities/conference.entity';

@Module({})
export class ConferencesModule {
  static register(): DynamicModule {
    return {
      module: ConferencesModule,
      // Jitsi Module is imported statically here, but this could be turned into a dynamically resolved dependency
      imports: [JitsiModule, MeetingsModule, UsersModule, TypeOrmModule.forFeature([Conference])],
      providers: [ConferencesService, ConferenceResolver, ConferenceAccessResolver],
    };
  }
}

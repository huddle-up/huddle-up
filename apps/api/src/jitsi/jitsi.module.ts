import { Module } from '@nestjs/common';
import { CONFERENCE_PROVIDER } from '../conferences/interfaces/conference-provider.interface';
import { JitsiConfigModule } from '../config/jitsi/config.module';
import { JitsiService } from './jitsi.service';

@Module({
  imports: [JitsiConfigModule],
  providers: [
    JitsiService,
    {
      provide: CONFERENCE_PROVIDER,
      useExisting: JitsiService,
    },
  ],
  exports: [JitsiService, CONFERENCE_PROVIDER],
})
export class JitsiModule {}

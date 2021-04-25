import { Module } from '@nestjs/common';
import { JitsiConfigModule } from '../config/jitsi/config.module';
import { JitsiService } from './jitsi.service';

@Module({
  imports: [JitsiConfigModule],
  providers: [JitsiService],
  exports: [JitsiService],
})
export class JitsiModule {}

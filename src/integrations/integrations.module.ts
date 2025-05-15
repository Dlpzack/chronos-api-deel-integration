import { Module } from '@nestjs/common';
import DeelModule from './deel/deel.module';

@Module({
  imports: [],
  exports: [DeelModule],
})
export default class IntegrationsModule {}

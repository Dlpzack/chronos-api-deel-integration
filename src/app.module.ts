import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DeelModule from './integrations/deel/deel.module';

@Module({
  imports: [DeelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

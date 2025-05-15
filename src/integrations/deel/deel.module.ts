import { Module } from '@nestjs/common';
import { DeelSDK } from './deel.sdk';
import DeelController from './deel.controller';
import DeelService from './services/deel.service';

@Module({
  controllers: [DeelController],
  providers: [
    { provide: 'DeelSDK', useValue: DeelSDK.getInstance() },
    DeelService,
  ],
})
export default class DeelModule {}

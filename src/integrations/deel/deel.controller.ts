import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import DeelService from './services/deel.service';

@Controller('deel')
export default class DeelController {
  constructor(private readonly deelService: DeelService) {}

  @Get('contracts')
  async getContracts(): Promise<unknown> {
    try {
      const contracts = await this.deelService.getContracts();
      return contracts;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch contracts: ' + error,
      );
    }
  }
}

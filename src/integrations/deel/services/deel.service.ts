import { Inject, Injectable } from '@nestjs/common';
import { DeelSDK } from '../deel.sdk';

@Injectable()
export default class DeelService {
  constructor(@Inject('DeelSDK') private readonly deelSdk: DeelSDK) {}

  async getContracts(): Promise<unknown> {
    try {
      const contracts = await this.deelSdk.client.getContractList();
      return contracts;
    } catch (error) {
      console.error('Error fetching contracts:', error);
      throw error;
    }
  }
}

import { Controller, Get, Post, Req, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import Environment from '../../environment';
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

  @Post('webhook')
  async handleWebhook(@Req() request: Request): Promise<void> {
    const signature = request.headers['x-deel-signature'];
    if (!signature) {
      throw new UnauthorizedException('Missing signature header');
    }

    const rawBody = request.body;
    const signingKey = Environment.getInstance().DeelWebhookSigningKey;
    
    if (!signingKey) {
      throw new InternalServerErrorException('Webhook signing key not configured');
    }

    const expectedSignature = crypto
      .createHmac('sha256', signingKey)
      .update('POST' + JSON.stringify(rawBody))
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature as string),
      Buffer.from(expectedSignature)
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Handle the webhook payload here
    console.log('Received valid webhook:', rawBody);
  }
}

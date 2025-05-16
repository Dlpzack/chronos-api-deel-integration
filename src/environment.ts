export default class Environment {
  static instance: Environment;

  private constructor() {
    process.loadEnvFile();
  }

  static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  get DeelAccessToken(): string {
    return process.env.DEEL_ACCESS_TOKEN || '';
  }

  get DeelAPIUrl(): string {
    return process.env.DEEL_API_URL || 'https://api.deel.com/v1';
  }

  get DeelWebhookSigningKey(): string {
    return process.env.DEEL_WEBHOOK_SIGNING_KEY || '';
  }
}

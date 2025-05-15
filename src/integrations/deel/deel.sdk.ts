import deel from '@api/deel';
import Environment from 'src/environment';

export class DeelSDK {
  private static instance: DeelSDK;
  public readonly client: typeof deel;
  private readonly environment = Environment.getInstance();

  private constructor() {
    this.client = deel.auth(this.environment.DeelAccessToken);
    this.client.server(this.environment.DeelAPIUrl);
  }

  public static getInstance(): DeelSDK {
    if (!DeelSDK.instance) {
      DeelSDK.instance = new DeelSDK();
    }
    return DeelSDK.instance;
  }
}


require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private get(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.get(k, true));
    return this;
  }

  public getSecret() {
    return this.get('APP_SECRET')
  }

  public getPort() {
    return this.get('PORT', true);
  }

  public isProduction() {
    const mode = this.get('ENV', false);
    return mode != 'development';
  }

  public getProvider(provider) {
    return {
      provider,
      callbackURL: this.get(`${provider.toUpperCase()}_CALLBACK_URL`, false),
      apiKey: this.get(`${provider.toUpperCase()}_API_KEY`),
      apiSecret: this.get(`${provider.toUpperCase()}_API_SECRET`),
    }
  }

}

const configService = new ConfigService(process.env).ensureValues([
  'APP_SECRET'
]);

export { configService };

export interface Config {
  apiKey: string;
  appId: string;
  baseUrl?: string;
}

export interface Feature {
  key: string;
  name: string;
  isEnabled: boolean;
}

export class Core {
  private get authHeader() {
    return window.btoa(`${this.appId} ${this.apiKey}`);
  }

  public constructor({
    apiKey,
    appId,
    baseUrl = 'https://featureset.io/api/features',
  }: Config) {
    this.apiKey = apiKey;
    this.appId = appId;
    this.baseUrl = baseUrl;
  }

  public async getFeatures(): Promise<Feature[]> {
    try {
      const res = await fetch(this.baseUrl, {
        headers: {
          Authorization: this.authHeader,
        },
      });
      const feat = await res.json();
      return feat.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  private readonly apiKey: string;

  private readonly appId: string;

  private readonly baseUrl: string;
}

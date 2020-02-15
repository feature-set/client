interface Config {
  apiKey: string;
  appId: string;
}

interface Feature {
  key: string;
  name: string;
  isEnabled: boolean;
}

export class Core {
  private get authHeader() {
    return window.btoa(`${this.appId} ${this.apiKey}`);
  }

  public constructor({ apiKey, appId }: Config) {
    this.apiKey = apiKey;
    this.appId = appId;
  }

  public async getFeatures(): Promise<Feature[]> {
    const res = await fetch(this.baseUrl, {
      headers: {
        Authorization: this.authHeader,
      },
    });
    return await res.json();
  }

  private readonly apiKey: string;

  private readonly appId: string;

  private baseUrl = 'https://featureset.io/api/features';
}

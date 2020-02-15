import { Core } from '@feature-set/core';

interface FeatureConfig {
  apiKey: string;
  appId: string;
  baseUrl?: string;
}

interface Feature {
  key: string;
  name: string;
  isEnabled: boolean;
}

type FeatureMap = { [key: string]: boolean };

export class Features {
  private core: Core;

  public features: Feature[] = [];

  public featureMap: FeatureMap = {};

  public constructor(config: FeatureConfig) {
    this.core = new Core(config);
  }

  public init = async () => {
    this.features = await this.core.getFeatures();
    this.features.forEach(f => (this.featureMap[f.key] = f.isEnabled));
  };

  public isEnabled = (featureName: string, defaultEnabled: boolean = false): boolean => {
    if (featureName in this.featureMap) {
      return this.featureMap[featureName];
    }
    return defaultEnabled;
  };
}

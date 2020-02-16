import React, {
  Children,
  useRef,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Features as FeaturesJs } from '@feature-set/js';

interface Feature {
  name: string;
  key: string;
  isEnabled: boolean;
}

interface FeatureMap {
  [key: string]: boolean;
}

interface FeatureContext {
  baseFeatures: Feature[];
  features: FeatureMap;
  isEnabled(featureName: string, defaultEnabled: boolean): boolean;
  isLoading: boolean;
}

const featureContext = createContext({} as FeatureContext);

const { Provider } = featureContext;

interface FeaturesProps {
  apiKey: string;
  appId: string;
  children: React.ReactNode;
  baseUrl?: string;
}

export function Features({ children, ...props }: FeaturesProps) {
  const f = useRef(new FeaturesJs(props));
  const [v, setV] = useState({
    baseFeatures: f.current.features,
    features: f.current.featureMap,
    isEnabled: f.current.isEnabled,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      await f.current.init();
      setV({
        baseFeatures: f.current.features,
        features: f.current.featureMap,
        isEnabled: f.current.isEnabled,
        isLoading: false,
      });
    })();
  }, []);

  return <Provider value={v}>{children}</Provider>;
}

interface FeatureProps {
  children: React.ReactNode;
  feature: string;
  defaultEnabled?: boolean;
}

export function Feature({
  children,
  feature,
  defaultEnabled = false,
}: FeatureProps) {
  const { isEnabled } = useContext(featureContext);

  return isEnabled(feature, defaultEnabled)
    ? Children.map(children, (child: any) =>
        child.type.displayName === elseName ? null : child,
      )
    : Children.map(children, (child: any) =>
        child.type.displayName === elseName ? child : null,
      );
}

const elseName = 'FeatureElse';

interface ElseProps {
  children: React.ReactNode | any;
}

export function Else({ children }: ElseProps) {
  return children;
}

Else.displayName = elseName;

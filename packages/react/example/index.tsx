import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Features, Feature, Else } from '../src';

const Home = () => (
  <div>
    <h1>FeatureSet Demo</h1>
    <Feature feature="anotherTest">
      <p>
        If <code>anotherTest</code> is enabled, this will show.
      </p>
      <Else>
        <p>
          If <code>anotherTest</code> is NOT enabled, this will show.
        </p>
      </Else>
    </Feature>
    <Feature feature="helpDocs">
      <p>
        If <code>helpDocs</code> is enabled, this will show.
      </p>
      <Else>
        <p>
          If <code>helpDocs</code> is NOT enabled, this will show.
        </p>
      </Else>
    </Feature>
    <Feature feature="anotherFeature">
      <p>
        If <code>anotherFeature</code> is enabled, this will show.
      </p>
      <Else>
        <p>
          If <code>anotherFeature</code> is NOT enabled, this will show.
        </p>
      </Else>
    </Feature>
    <Feature feature="singleSignOn" defaultEnabled={true}>
      <p>
        This will be shown even if <code>singleSignOn</code> is not enabled
        because the <code>defaultEnabled</code> is <code>true</code>.
      </p>
    </Feature>
    <Feature feature="testingFeature">
      <p>
        If <code>testingFeature</code> is enabled, this will show.
      </p>
      <Else>
        <p>
          If <code>testingFeature</code> is NOT enabled, this will show.
        </p>
      </Else>
    </Feature>
  </div>
);

const App = () => {
  return (
    <Features
      appId="qUoZI5jSvlXDu34noBr2"
      apiKey="099499bf-ed56-44b4-89d9-33f3eab032a8"
      baseUrl="https://staging-app.featureset.io/api/features"
    >
      <Home />
    </Features>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

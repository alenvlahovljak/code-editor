import React, { Suspense } from 'react';

import { Main } from 'layout';
import { CodeIntegrator } from 'UI';
import { PageAnimation } from './components/animations';

import './i18n';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

// eslint-disable-next-line no-empty-pattern
function App({}: AppProps) {
  return (
    <Suspense fallback={<PageAnimation />}>
      <Main className="App">
        <CodeIntegrator />
      </Main>
    </Suspense>
  );
}

export default App;

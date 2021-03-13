import React, { Suspense } from 'react';

import { Main } from 'layout';
import { CodeIntegrator } from 'UI';

import './App.css';
import './i18n';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Suspense fallback="loading">
      <Main className="App">
        <CodeIntegrator />
      </Main>
    </Suspense>
  );
}

export default App;

import React, { Suspense, FC } from 'react';

import { Main } from 'layout';
import { CodeIntegrator } from 'UI';
import { PageAnimation } from './components/animations';

import './i18n';

const App: FC = () => {
  return (
    <Suspense fallback={<PageAnimation />}>
      <Main className="App">
        <CodeIntegrator />
      </Main>
    </Suspense>
  );
};

export default App;

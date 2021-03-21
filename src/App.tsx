import React, { Suspense, FC } from 'react';
import { Main } from 'layout';
import { CodeIntegrator } from 'UI';
import { ThemeProvider } from './context/theme-context';
import { PageAnimation } from './components/animations';

import './i18n';

const App: FC = () => {
  return (
    <Suspense fallback={<PageAnimation />}>
      <ThemeProvider>
        <Main className="App">
          <CodeIntegrator />
        </Main>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;

import { Main } from 'layout';

import React, { useState, useEffect } from 'react';

import { CodeIntegrator } from 'UI';

import './App.css';

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <Main className="App">
      <CodeIntegrator />
    </Main>
  );
}

export default App;

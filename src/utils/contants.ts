export const WASM_URL = 'https://unpkg.com/esbuild-wasm@0.8.57/esbuild.wasm';

export const FALLBACK_LANGUAGE = 'en';
export const WHITELIST_LANGUAGES = ['bs', 'de', 'hr', 'fr', 'sr', 'en'];

export const CODE_EDITOR_LANGUAGE = 'javascript';

export const DEFAULT_INPUT = `
import React from 'react';
import ReactDOM from 'react-dom';
const App = ()=> {
  return <div>Hello World!</div>
}

ReactDOM.render(<App />, document.getElementById('root'));
`;

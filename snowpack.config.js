/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript'
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    types: true
  },
  devOptions: {
    port: 3000
  },
  buildOptions: {
    out: 'dist',
    sourcemap: true
  },
  alias: {
    '@/*': './src/*',
    'types/*': './src/types/*',
    layout: './src/components/layout/index',
    UI: './src/components/UI/index',
    'components/*': './src/components/*'
  }
};

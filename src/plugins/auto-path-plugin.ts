import type * as esbuild from 'esbuild-wasm';
import axios from 'axios';

import { initCache } from '../utils/helpers';

const pkgsCache = initCache('pkgs');

export const autoPathPlugin = (inputCode: string) => {
  return {
    name: 'auto-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, (args) => {
        console.log('onResolve entry point', args);
        return { path: args.path, namespace: 'a' };
      });

      build.onResolve({ filter: /^\.+\// }, async (args) => {
        console.log('onResolve ./ and ../ - relative paths', args);

        return {
          namespace: 'a',
          path: new URL(args.path, `https://unpkg.com/${args.resolveDir}/`).href
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve - main file', args);

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode
          };
        }

        const cachedResult = await pkgsCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        console.log('request', request);
        console.log('data', data);

        const loader = args.path.match(/.css$/) ? 'css' : 'jsx';

        const result: esbuild.OnLoadResult = {
          loader,
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await pkgsCache.setItem(args.path, result);

        return result;
      });
    }
  };
};

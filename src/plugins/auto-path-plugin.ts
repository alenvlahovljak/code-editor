import type * as esbuild from 'esbuild-wasm';
import axios from 'axios';

import { initCache, resolveFileType } from '../utils/helpers';

const pkgsCache = initCache('pkgs');

export const autoPathPlugin = (inputCode: string) => {
  return {
    name: 'auto-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, (args) => {
        console.log('onResolve entry point', args);
        return { path: args.path, namespace: 'foo' };
      });

      build.onResolve({ filter: /^\.+\// }, async (args) => {
        console.log('onResolve ./ and ../ - relative paths', args);

        return {
          namespace: 'foo',
          path: new URL(args.path, `https://unpkg.com/${args.resolveDir}/`).href
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve - main file', args);

        return {
          namespace: 'foo',
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

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: resolveFileType(args.path, data),
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await pkgsCache.setItem(args.path, result);

        return result;
      });
    }
  };
};

import type * as esbuild from 'esbuild-wasm';
import axios from 'axios';

import { cssInjector, initCache, escapeCharacters, resolveFileType } from '../utils/helpers';

const pkgsCache = initCache('pkgs');

export const autoPathPlugin = (inputCode: string | undefined) => {
  return {
    name: 'auto-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // resolve entry point
      build.onResolve({ filter: /(^index\.js$)/ }, (args: esbuild.OnResolveArgs) => {
        console.log('onResolve - entry point', args);

        return { path: args.path, namespace: 'foo' };
      });

      // resolve relative paths
      build.onResolve({ filter: /^\.+\// }, async (args: esbuild.OnResolveArgs) => {
        console.log('onResolve ./ and ../ - relative paths', args);

        return {
          namespace: 'foo',
          path: new URL(args.path, `https://unpkg.com/${args.resolveDir}/`).href
        };
      });

      // resolve other files
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        console.log('onResolve - other file', args);

        return {
          namespace: 'foo',
          path: `https://unpkg.com/${args.path}`
        };
      });

      build.onLoad({ filter: /(^index\.js$)/ }, (args: esbuild.OnLoadArgs) => {
        console.log('onBuild - main file', args);

        return {
          loader: 'jsx',
          contents: inputCode
        };
      });

      // order matter - first we check the cache
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        console.log('onLoad - cached packages', args);

        const cachedResult = await pkgsCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        }

        return null;
      });

      // order matter - we have to check is there any CSS import before the universal filter
      build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
        console.log('onLoad - CSS file', args);

        const { data, request } = await axios.get(args.path);

        const escaped = escapeCharacters(data, /[.*+?^${}()|[\]\\]/g);
        const contents = cssInjector(escaped);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await pkgsCache.setItem<esbuild.OnLoadResult>(args.path, result);

        return result;
      });

      // order matter - if there is no cache or isn't uncached CSS file
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        console.log('onLoad - uncached JSX or CSS file', args);

        const { data, request } = await axios.get(args.path);

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

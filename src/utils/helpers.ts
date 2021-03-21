import localForage from 'localforage';

export function initCache(name: string) {
  return localForage.createInstance({
    name
  });
}

export function escapeCharacters(str: string) {
  return str.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
}

export function cssInjector(css: string) {
  return `const style = document.createElement('style');
          style.innerText = '${css}';
          document.head.appendChild(style);`;
}

export function resolveFileType(path: string, data: string) {
  const css = escapeCharacters(data);
  return path.match(/.css$/) ? cssInjector(css) : data;
}

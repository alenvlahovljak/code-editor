import localForage from 'localforage';

export function initCache(name: string) {
  return localForage.createInstance({
    name
  });
}

export function escapeCharacters(str: string, rule: RegExp) {
  return str.replace(rule, '\\$&');
}

export function cssInjector(css: string) {
  return `const style = document.createElement('style');
          style.innerText = '${css}';
          document.head.appendChild(style);`;
}

export function resolveFileType(path: string, data: string) {
  const css = escapeCharacters(data, /[.*+?^${}()|[\]\\]/g);
  return path.match(/.css$/) ? cssInjector(css) : data;
}

import localForage from 'localforage';

export function initCache(name: string) {
  return localForage.createInstance({
    name
  });
}

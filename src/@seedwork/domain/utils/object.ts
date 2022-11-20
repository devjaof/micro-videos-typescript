export function deepFreeze<T>(obj: T) {
  const props = Object.getOwnPropertyNames(obj);

  for (const name of props) {
    const value = obj[name as keyof T]
    if(value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
import { describe, test, expect } from 'vitest';

import { PrivateConstructorSymbol } from '#shared/symbols.js';

import { DOMTokenList } from './DOMTokenList.js';

// FIXME: This suite should be moved to Document test later
describe('DOMTokenList', () => {
  test('illegal construction', () => {
    // @ts-expect-error
    expect(() => new DOMTokenList()).toThrow(TypeError);
  });

  test('it works', () => {
    const classList = new DOMTokenList(PrivateConstructorSymbol);
    expect(classList.length).toBe(0);
    expect(classList.value).toBe('');
  });

  test('add()', () => {
    const classList = new DOMTokenList(PrivateConstructorSymbol);
    classList.add('token1', 'token2', 'token3');
    expect(classList.value).toBe('token1 token2 token3');
  });

  test('remove()', () => {
    const classList = new DOMTokenList(PrivateConstructorSymbol);
    classList.add('token1', 'token2', 'token3');
    classList.remove('token2');
    expect(classList.value).toBe('token1 token3');
  });

  test('toggle()', () => {
    const classList = new DOMTokenList(PrivateConstructorSymbol);
    classList.add('token1', 'token2', 'token3');

    classList.toggle('token2');
    expect(classList.value).toBe('token1 token3');

    classList.toggle('token2');
    expect(classList.value).toBe('token1 token3 token2');
  });

  test('replace()', () => {
    const classList = new DOMTokenList(PrivateConstructorSymbol);
    classList.add('token1', 'token2', 'token3');

    const result = classList.replace('token2', 'token4');
    expect(result).toBe(true);
    expect(classList.value).toBe('token1 token4 token3');

    expect(classList.replace('token2', 'token4')).toBe(false);
  });

  test('indexable', () => {
    const classList = new DOMTokenList(PrivateConstructorSymbol);
    // @ts-ignore
    expect(classList[0]).toBe(undefined);
    // @ts-ignore
    expect(classList[1]).toBe(undefined);

    // @ts-ignore
    classList[0] = 'test';
    // @ts-ignore
    expect(classList[0]).toBe(undefined);

    classList.add('token1');
    // @ts-ignore
    expect(classList[0]).toBe('token1');
  });
});

import React from 'react';
import { dictionary, templates, preserveExact } from './cac-translations';

export type Language = 'EN' | 'IN';
let current: Language = 'EN';
try { current = window.localStorage.getItem('cac-language') === 'IN' ? 'IN' : 'EN'; } catch {}
export const getLanguage = () => current;
const untranslated = new Set<string>();
export const getUntranslatedStrings = () => Array.from(untranslated);
export function setLanguage(language: Language) {
  current = language;
  try { window.localStorage.setItem('cac-language', language); } catch {}
  if (typeof document !== 'undefined') document.documentElement.lang = language === 'IN' ? 'id' : 'en';
}

const escapePattern = (text: string) => text.replace(/[|\\{}()[\]^+*?.-]/g, '\\$&');
const patterns = Object.entries(templates).map(([from, to]) => {
  const names: string[] = [];
  const body = from.split(/(\{[^}]+\})/).map(part => {
    if (part.startsWith('{') && part.endsWith('}')) { names.push(part.slice(1, -1)); return '(.+?)'; }
    return escapePattern(part);
  }).join('');
  return { regex: new RegExp('^' + body + '$'), names, to };
});

export function translateText(text: string): string {
  if (current === 'EN' || !text.trim()) return text;
  const trimmed = text.trim();
  if (preserveExact.includes(trimmed)) return text;
  const translated = dictionary[trimmed];
  if (translated) return text.replace(trimmed, translated);
  for (const pattern of patterns) {
    const match = trimmed.match(pattern.regex);
    if (!match) continue;
    let result = pattern.to;
    pattern.names.forEach((name, i) => { result = result.split('{' + name + '}').join(match[i + 1]); });
    return text.replace(trimmed, result);
  }
  if (/[A-Za-z]{3}/.test(trimmed) && !/^(https?:|\+?\d|[^\s]+@)/.test(trimmed)) untranslated.add(trimmed);
  return text;
}

// The JSX factory translates rendered content while keeping route, handler,
// form-value, key and source-data semantics unchanged.
export function createLocalizedElement(type: React.ElementType, props: any, ...children: React.ReactNode[]): React.ReactElement {
  const next = props ? { ...props } : {};
  if (typeof type === 'string') {
    for (const key of ['alt', 'aria-label', 'aria-valuetext', 'placeholder', 'title']) {
      if (typeof next[key] === 'string') next[key] = translateText(next[key]);
    }
    if (type === 'option' && next.value === undefined) next.value = children.filter(x => typeof x === 'string' || typeof x === 'number').join('');
  }
  return React.createElement(type, next, ...children.map(child => typeof child === 'string' ? translateText(child) : child));
}

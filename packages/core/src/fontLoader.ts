import type { FontPairing } from './displayPrefs.js';

const BUNNY_URLS: Partial<Record<FontPairing, string>> = {
  'ibm-plex':      'https://fonts.bunny.net/css?family=ibm-plex-sans:400,500,600,700|ibm-plex-serif:400,600&display=swap',
  'atkinson-lora': 'https://fonts.bunny.net/css?family=atkinson-hyperlegible:400,700|lora:400,600&display=swap',
};

const injected = new Set<FontPairing>();

export function ensureFontLink(pairing: FontPairing): void {
  if (pairing === 'system' || injected.has(pairing)) return;

  const url = BUNNY_URLS[pairing];
  if (!url) return;

  if (injected.size === 0) {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.bunny.net';
    document.head.appendChild(preconnect);
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);

  injected.add(pairing);
}

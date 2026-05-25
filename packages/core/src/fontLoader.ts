import type { FontPairing } from './displayPrefs.js';

const BUNNY_URLS: Partial<Record<FontPairing, string>> = {
  'ibm-plex':      'https://fonts.bunny.net/css?family=ibm-plex-sans:400,500,600,700&display=swap',
  'atkinson-lora': 'https://fonts.bunny.net/css?family=atkinson-hyperlegible:400,700|lora:400,600&display=swap',
};

const injected = new Set<FontPairing>();

// Pre-seed from any <link> tags the bootstrap script injected before this module loaded
for (const [pairing, url] of Object.entries(BUNNY_URLS) as Array<[FontPairing, string]>) {
  if (typeof document !== 'undefined' &&
      document.head.querySelector(`link[rel="stylesheet"][href="${url}"]`)) {
    injected.add(pairing as FontPairing);
  }
}

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

/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: {
      readonly VITE_ENCRYPTION_KEY: string;
      readonly [key: string]: string;
    };
  }
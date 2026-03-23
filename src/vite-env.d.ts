/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALGOLIA_APP_ID: string;
  readonly VITE_ALGOLIA_API_KEY: string;
  readonly VITE_ALGOLIA_INDEX_NAME: string;
  readonly VITE_ALGOLIA_INDEX_NAME_SUGGESTIONS: string;
  readonly VITE_ALGOLIA_AGENT_ID: string;
}

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
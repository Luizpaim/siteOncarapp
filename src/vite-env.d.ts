/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  readonly VITE_PORT_SERVE: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

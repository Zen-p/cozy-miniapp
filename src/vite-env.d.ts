/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // другие переменные, которые ты используешь
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_ENABLE_REQUEST: string;
  readonly VITE_ENABLE_DASHBOARD: string;
  readonly VITE_HELP_BONUS_INIZIATIVE: string;
  readonly VITE_MOCK_API?: string;

  readonly VITE_ANALYTICS_ENABLE: string;
  readonly VITE_ANALYTICS_TOKEN: string;
  readonly VITE_ANALYTICS_API_HOST: string;
  readonly VITE_ANALYTICS_PERSISTENCE: string;
  readonly VITE_ANALYTICS_LOG_IP: string;
  readonly VITE_ANALYTICS_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

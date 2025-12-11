/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_HELP_CARTA_DELLA_CULTURA: string;
  readonly VITE_LINK_RETAILERS: string;
  readonly VITE_CLOSE_DEEPLINK: string;

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

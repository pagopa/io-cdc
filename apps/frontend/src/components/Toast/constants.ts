import { IconType } from '@io-cdc/ui';

type ConfigToast = {
  icon: IconType;
  color: string;
};

export const ICON_COLOR_CONFIG: { success: ConfigToast; error: ConfigToast; default: ConfigToast } =
  {
    success: {
      icon: 'alertCheckCircle',
      color: '#6CC66A',
    },
    error: {
      icon: 'info',
      color: '#FE6666',
    },
    default: {
      icon: 'info',
      color: '#808080',
    },
  };

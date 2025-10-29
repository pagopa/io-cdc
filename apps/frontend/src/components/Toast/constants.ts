import { IconType } from '@io-cdc/ui';

type ConfigToast = {
  icon: IconType;
  color: string;
};

export const ICON_COLOR_CONFIG: {
  reminder: ConfigToast;
  success: ConfigToast;
  error: ConfigToast;
  default: ConfigToast;
} = {
  reminder: {
    icon: 'info',
    color: '#6BCFFB',
  },
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

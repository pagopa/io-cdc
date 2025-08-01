import mixpanel, { Persistence } from 'mixpanel-browser';

import { isEnvConfigEnabled } from './utils';

const ANALYTICS_ENABLE = import.meta.env.VITE_ANALYTICS_ENABLE;
// const ANALYTICS_MOCK = isEnvConfigEnabled(import.meta.env.VITE_ANALYTICS_MOCK);
const ANALYTICS_TOKEN = import.meta.env.VITE_ANALYTICS_TOKEN || '';
const ANALYTICS_API_HOST = import.meta.env.VITE_ANALYTICS_API_HOST;
const ANALYTICS_PERSISTENCE = import.meta.env.VITE_ANALYTICS_PERSISTENCE;
const ANALYTICS_LOG_IP = isEnvConfigEnabled(import.meta.env.VITE_ANALYTICS_LOG_IP);
const ANALYTICS_DEBUG = isEnvConfigEnabled(import.meta.env.VITE_ANALYTICS_DEBUG);

type EventCategory = 'KO' | 'UX';

type WindowMPValues = {
  initMixPanelCdcWeb?: boolean;
} & Window;

type EventType = 'error' | 'screen_view' | undefined;

export interface EventProperties {
  [key: string]: unknown;
  event_category?: EventCategory;
  event_type?: EventType;
}
// eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
// let mockSuperProperties: Record<string, unknown> = {};

/** To call in order to start the analytics service, otherwise no event will be sent */
export const initAnalytics = (deviceId: string | undefined): void => {
  if (ANALYTICS_ENABLE && !(window as WindowMPValues).initMixPanelCdcWeb && !!deviceId) {
    mixpanel.init(ANALYTICS_TOKEN, {
      api_host: ANALYTICS_API_HOST,
      cookie_domain: '.ioapp.it', // change this value with your dev domain
      cookie_expiration: 0,
      debug: ANALYTICS_DEBUG,
      ip: ANALYTICS_LOG_IP,
      persistence: ANALYTICS_PERSISTENCE as Persistence,
      secure_cookie: true, // change this value as false if you run in local .env
    });
    mixpanel.identify(deviceId);

    (window as WindowMPValues).initMixPanelCdcWeb = true;
  }
  return;
};

/**
 * To notify an event through the analytics tool:
 * @property event_name: the name of the event
 * @property properties: the additional payload sent with the event
 * @property callback: an action taken when the track has completed (If the action taken immediately after the track is an exit action from the application, it's better to use this callback to perform the exit, in order to give to mixPanel the time to send the event)
 */
export const trackEvent = (
  event_name: string,
  properties?: EventProperties,
  callback?: () => void,
): void => {
  if (ANALYTICS_ENABLE && (window as WindowMPValues).initMixPanelCdcWeb) {
    trackEventThroughAnalyticTool(event_name, properties, callback);
  } else {
    if (callback) {
      callback();
    }
  }
};

const trackEventThroughAnalyticTool = (
  event_name: string,
  properties?: EventProperties,
  callback?: () => void,
): void => {
  let called = false;
  const wrappedCallback = callback
    ? () => {
        try {
          called = true;
          callback();
        } catch (reason) {
          // eslint-disable-next-line no-console
          console.error(
            `Something gone wrong while calling trackEvent ${event_name} callback`,
            reason,
          );
        }
      }
    : undefined;
  try {
    mixpanel.track(
      event_name,
      {
        ...properties,
      },
      wrappedCallback ? { send_immediately: true } : undefined,
      wrappedCallback,
    );
  } catch (reason) {
    // eslint-disable-next-line no-console
    console.error('Something gone wrong while sending data to mixpanel:', reason);
    // eslint-disable-next-line no-console
    console.log(event_name, properties);

    if (wrappedCallback && !called) {
      wrappedCallback();
    }
  }
};

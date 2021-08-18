import { AmplitudeEventNodes } from '../interfaces/common/amplitude.common.interfaces';

const AMPLITUDE_KEY = '13e94566ae299c8fe7697c783f2fba7b';

export const initAmplitude = () => {
  if (typeof window !== 'undefined') {
    window.amplitude.getInstance().init(AMPLITUDE_KEY);
  }
};

export const setAmplitudeUserId = (userId: string) => {
  if (typeof window !== 'undefined') {
    window.amplitude.getInstance().setUserId(userId);
  }
};

export const amplitudeEvent = (name: string, params?: {}) => {
  if (typeof window !== 'undefined') {
    window.amplitude.getInstance().logEvent(name, params);
  }
};

export const constructEventName = (text: string, component: AmplitudeEventNodes) => {
  if (typeof window !== 'undefined') {
    return `${window.location.pathname !== '/' ? window.location.pathname : ''}/${text}-${component}`.replace(/\s+/g, '-').toUpperCase();
  }

  return 'INVALID-EVENT';
};

let amplitude: any;
const AMPLITUDE_KEY = '13e94566ae299c8fe7697c783f2fba7b';

export const initAmplitude = () => {
  if (process.browser) {
    amplitude = require('amplitude-js');
    amplitude.getInstance().init(AMPLITUDE_KEY);
  }
};

export const setAmplitudeUserId = (userId: string) => {
  if (process.browser) {
    amplitude.getInstance().setUserId(userId);
  }
};

export const amplitudeEvent = (name: string, params?: {}) => {
  if (process.browser) {
    amplitude.getInstance().logEvent(name, params);
  }
};

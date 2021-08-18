import { AmplitudeEventNodes } from '../interfaces/common/amplitude.common.interfaces';
import router from 'next/router';
import { useAppSelector } from '../redux/hooks.redux';
import { selectLanguageCode } from '../redux/slices/configuration.slices.redux';

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

export const handleLinkClick = async (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined,
  link: {
    url: string;
    type: AmplitudeEventNodes;
    text: string;
  },
) => {
  e?.preventDefault();
  amplitudeEvent(constructEventName(link.text, link.type));
  const languageCode = useAppSelector(selectLanguageCode);

  router.push(`/${languageCode}${link.url}`);
};

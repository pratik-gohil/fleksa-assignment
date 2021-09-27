import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { AmplitudeEventNodes } from '../../../../interfaces/common/amplitude.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

interface ICustomLinkProps {
  amplitude: {
    type: AmplitudeEventNodes;
    text: string;
    eventProperties?: any;
  };
  placeholder?: string;
  href?: string;
  externalHref?: string;
  isLanguageChange?: boolean;
  Override?: StyledComponent<'a', DefaultTheme>;
  callback?: () => void | Promise<void>;
  target?: '_blank';
}

const CustomLink: FunctionComponent<ICustomLinkProps> = ({
  amplitude,
  children,
  placeholder,
  href,
  isLanguageChange,
  Override,
  externalHref,
  callback,
  target,
}) => {
  const languageCode = useAppSelector(selectLanguageCode);
  const router = useRouter();

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined) => {
    if (typeof window !== 'undefined') {
      e?.preventDefault();

      // TODO: call back if it's present
      if (callback) {
        callback();
        // console.log('callback called');
      }

      // console.log('amplitude ', amplitude);

      amplitudeEvent(constructEventName(amplitude.text, amplitude.type), amplitude.eventProperties);

      // TODO:  change the route if href and externalHref is exit
      if (href) router.push(`/${isLanguageChange ? (router.locale === 'en' ? 'de' : 'en') : languageCode}${href}`);
      else if (externalHref && target)
        window.open(
          externalHref,
          target, // <- This is what makes it open in a new window.
        );
      else if (externalHref) window.location.href = externalHref;
    }
  };

  return Override ? (
    <Override onClick={handleLinkClick} href={externalHref}>
      {placeholder}
      {children}
    </Override>
  ) : (
    <Link onClick={handleLinkClick} href={externalHref}>
      {placeholder}
      {children}
    </Link>
  );
};

export default CustomLink;

const Link = styled.a``;

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
      }

      amplitudeEvent(constructEventName(amplitude.text, amplitude.type), amplitude.eventProperties);

      // TODO:  change the route if href and externalHref is exit
      if (href) {
        const jumpLink = isLanguageChange ? (router.locale === 'en' ? `/de${href}` : `/en${href}`) : `/${languageCode}${href}`;

        window.location.href = jumpLink; // ? Reload transition
        // router.push(jumpLink); // ?  Smooth transition
      } else if (externalHref && target)
        window.open(
          externalHref,
          target, // <- This is what makes it open in a new window.
        );
    }
  };

  return Override ? (
    <Override onClick={handleLinkClick} href="">
      {placeholder}
      {children}
    </Override>
  ) : (
    <Link onClick={handleLinkClick} href="">
      {placeholder}
      {children}
    </Link>
  );
};

export default CustomLink;

const Link = styled.a``;

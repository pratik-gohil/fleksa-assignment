import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { AmplitudeEventNodes } from '../../../../interfaces/common/amplitude.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { IProduct } from '../../../../interfaces/common/product.common.interfaces';
import { IBanner } from '../../../../interfaces/common/index.common.interfaces';
import { ISibling } from '../../../../interfaces/common/sibling.common.interfaces';

interface ICustomLinkProps {
  amplitude: {
    type: AmplitudeEventNodes;
    text: string;
    eventProperties?: Record<string, number | string> | IProduct | IBanner | ISibling;
  };
  placeholder?: string;
  href: string;
  externelHref?: string;
  isLanguageChange?: boolean;
  Override?: StyledComponent<'a', DefaultTheme>;
}

const CustomLink: FunctionComponent<ICustomLinkProps> = ({ amplitude, children, placeholder, href, isLanguageChange, Override, externelHref }) => {
  const languageCode = useAppSelector(selectLanguageCode);
  const router = useRouter();

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined) => {
    e?.preventDefault();

    console.log('amplitude ', amplitude);

    amplitudeEvent(constructEventName(amplitude.text, amplitude.type), amplitude.eventProperties);
    router.push(`/${isLanguageChange ? (router.locale === 'en' ? 'de' : 'en') : languageCode}${externelHref ?? href}`);
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

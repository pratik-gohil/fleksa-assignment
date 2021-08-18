import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { AmplitudeEventNodes } from '../../../../interfaces/common/amplitude.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { IProduct } from '../../../../interfaces/common/product.common.interfaces';

interface ICustomLinkProps {
  amplitude: {
    type: AmplitudeEventNodes;
    text: string;
    eventProperties?: Record<string, number | string> | IProduct;
  };
  placeholder?: string;
  href: string;
  isLanguageChange?: boolean;
  Override?: StyledComponent<'a', DefaultTheme>;
}

const CustomLink: FunctionComponent<ICustomLinkProps> = ({ amplitude, children, placeholder, href, isLanguageChange, Override }) => {
  const languageCode = useAppSelector(selectLanguageCode);
  const router = useRouter();

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined) => {
    e?.preventDefault();
    alert(href);
    amplitudeEvent(constructEventName(amplitude.text, amplitude.type), amplitude.eventProperties);
    router.push(`/${isLanguageChange ? (router.locale === 'en' ? 'de' : 'en') : languageCode}${href}`);
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

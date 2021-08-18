import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { AmplitudeEventNodes } from '../../../../interfaces/common/amplitude.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

interface ICustomLinkProps {
  amplitude: {
    type: AmplitudeEventNodes;
    text: string;
  };
  placeholder?: string;
  href: string;
  isLanguageChange?: boolean;
}

const CustomLink: FunctionComponent<ICustomLinkProps> = ({ amplitude, children, placeholder, href, isLanguageChange }) => {
  const languageCode = useAppSelector(selectLanguageCode);
  const router = useRouter();

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined) => {
    e?.preventDefault();
    amplitudeEvent(constructEventName(amplitude.text, amplitude.type));
    router.push(`/${isLanguageChange ? (router.locale === 'en' ? 'de' : 'en') : languageCode}${href}`);
  };

  return (
    <a onClick={handleLinkClick} href="">
      {placeholder}
      {children}
    </a>
  );
};

export default CustomLink;

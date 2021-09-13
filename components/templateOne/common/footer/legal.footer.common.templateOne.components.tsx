import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import CustomLink from '../amplitude/customLink';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 12px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    font-size: 14px;
    margin-top: 0;
  }
`;

const SocialMediaLinks = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconContainer = styled.a`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.textLightColor};
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.3rem;
  cursor: pointer;
  filter: brightness(0.9);

  &:hover {
    filter: brightness(1);
  }
`;

const Icon = styled.img`
  height: 18px;
  width: 18px;
`;

const LegalLinks: FunctionComponent = () => {
  const socialData = useAppSelector(selectShop)?.social;
  const { t } = useTranslation('footer');
  const socialLinks = {
    facebook: socialData?.facebook ?? 'https://www.facebook.com/fleksaofficial',
    instagram: socialData?.instagram ?? 'https://www.instagram.com/fleksaofficial/',
    twitter: socialData?.twitter ?? 'https://twitter.com/fleksaofficial',
  };

  return (
    <Wrapper>
      <SocialMediaLinks>
        <CustomLink
          amplitude={{
            type: 'icon',
            text: 'instagram',
          }}
          href="/"
          externelHref={socialLinks.instagram}
          Override={IconContainer}
        >
          <Icon src={'/assets/svg/social/instagram.svg'} />
        </CustomLink>

        <CustomLink
          amplitude={{
            type: 'icon',
            text: 'twitter',
          }}
          href="/"
          externelHref={socialLinks.twitter}
          Override={IconContainer}
        >
          <Icon src={'/assets/svg/social/twitter.svg'} />
        </CustomLink>

        <CustomLink
          amplitude={{
            type: 'icon',
            text: 'facebook',
          }}
          href="/"
          externelHref={socialLinks.facebook}
          Override={IconContainer}
        >
          <Icon src={'/assets/svg/social/facebook.svg'} />
        </CustomLink>
      </SocialMediaLinks>

      <Text>
        <CustomLink
          amplitude={{
            type: 'link',
            text: 'fleksa',
          }}
          target="_blank"
          externelHref="https://fleksa.com"
          placeholder={'©️2021 Fleksa'}
        />{' '}
        |{' '}
        <CustomLink
          href={`/terms`}
          amplitude={{
            text: t('@terms'),
            type: 'link',
          }}
          placeholder={t('@terms')}
        />{' '}
        |{' '}
        <CustomLink
          href={`/privacy-policy`}
          amplitude={{
            text: t('@privacy'),
            type: 'link',
          }}
          placeholder={t('@privacy')}
        />{' '}
        |{' '}
        <CustomLink
          href={`/imprint`}
          amplitude={{
            text: t('@imprint'),
            type: 'link',
          }}
          placeholder={t('@imprint')}
        />
      </Text>
    </Wrapper>
  );
};

export default LegalLinks;

import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import { selectAppLinks } from '../../../../redux/slices/common.slices.redux';
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
  const appLinks = useAppSelector(selectAppLinks);
  const { t } = useTranslation('footer');
  const socialLinks = [
    {
      name: 'twitter',
      icon: '/assets/svg/social/twitter.svg',
      url: socialData?.twitter || 'https://twitter.com/fleksaofficial',
    },
    {
      name: 'facebook',
      icon: '/assets/svg/social/facebook.svg',
      url: socialData?.facebook || 'https://www.facebook.com/fleksaofficial',
    },
    {
      name: 'instagram',
      icon: '/assets/svg/social/instagram.svg',
      url: socialData?.instagram || 'https://www.instagram.com/fleksaofficial/',
    },
    {
      name: 'android',
      icon: '/assets/svg/app/google-playstore.svg',
      url: appLinks?.android,
    },
    {
      name: 'ios',
      icon: '/assets/svg/app/apple-appstore.svg',
      url: appLinks?.ios,
    },
  ];

  return (
    <Wrapper>
      <SocialMediaLinks>
        {socialLinks.map(
          (link, index) =>
            link.url && (
              <CustomLink
                amplitude={{
                  type: 'icon',
                  text: link.name,
                }}
                target="_blank"
                externalHref={link.url}
                Override={IconContainer}
                key={index}
              >
                <Icon src={link.icon} />
              </CustomLink>
            ),
        )}
      </SocialMediaLinks>

      <Text>
        <CustomLink
          key="fleksa-default-link"
          amplitude={{
            type: 'link',
            text: 'fleksa',
          }}
          target="_blank"
          externalHref="https://fleksa.com"
          placeholder={'©️2021 Fleksa'}
        />{' '}
        |{' '}
        <CustomLink
          key="terms-default-link"
          href={`/terms`}
          amplitude={{
            text: t('@terms'),
            type: 'link',
          }}
          placeholder={t('@terms')}
        />{' '}
        |{' '}
        <CustomLink
          key="privacy-default-link"
          href={`/privacy-policy`}
          amplitude={{
            text: t('@privacy'),
            type: 'link',
          }}
          placeholder={t('@privacy')}
        />{' '}
        |{' '}
        <CustomLink
          key="imprint-default-link"
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

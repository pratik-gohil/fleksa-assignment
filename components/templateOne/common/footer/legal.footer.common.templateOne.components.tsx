import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';

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
  const languageCode = useAppSelector(selectLanguageCode)
  const socialLinks = {
    facebook: socialData?.facebook ?? 'https://www.facebook.com/fleksaofficial',
    instagram: socialData?.instagram ?? 'https://www.instagram.com/fleksaofficial/',
    twitter: socialData?.twitter ?? 'https://twitter.com/fleksaofficial',
  };

  return (
    <Wrapper>
      <SocialMediaLinks>
        <IconContainer href={socialLinks.instagram}>
          <Icon src={'/assets/svg/social/instagram.svg'} />
        </IconContainer>

        <IconContainer href={socialLinks.twitter}>
          <Icon src={'/assets/svg/social/twitter.svg'} />
        </IconContainer>

        <IconContainer href={socialLinks.facebook}>
          <Icon src={'/assets/svg/social/facebook.svg'} />
        </IconContainer>
      </SocialMediaLinks>
      <Text>
        <a href={`${languageCode}/terms`}>Terms & Conditions</a> | <a href={`${languageCode}/privacy-policy`}>Privacy Policy</a> | <a href={`${languageCode}/imprint`}>Imprint</a>
      </Text>
    </Wrapper>
  );
};

export default LegalLinks;

import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';

const Wrapper = styled.div`
  background: ${(p) => p.theme.textDarkColor};
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);

    ::after {
      width: 1.5rem;
      left: 0;
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  max-height: 500px;

  width: calc(100% - 3rem);
  height: 100%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const FlagImage = styled.p`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 2px solid #efefef;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  position: relative;
  color: ${(props) => props.theme.primaryColor};
  background-color: #444;
  text-transform: uppercase;
  font-size: 2.2rem;
`;

const Link = styled.a<{ active: boolean }>`
  color: ${(p) => (p.active ? p.theme.primaryColor : p.theme.textLightActiveColor)};
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;

  &:hover {
    color: ${(p) => p.theme.primaryColor};
  }
`;

const LougoutButton = styled.a`
  color: ${(props) => props.theme.textLightActiveColor};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 0.1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    background: #fff;
    color: ${(props) => props.theme.textDarkColor};
  }
`;

const ActiveUnderline = styled.span<{ active: boolean }>`
  width: 100%;
  height: 4px;
  display: ${(p) => (p.active ? 'block' : 'none')};
  background: ${(p) => p.theme.primaryColor};
  border-radius: 3px;
`;

export const MyAccountLeftSection = () => {
  const customerData = useAppSelector(selectCustomer);
  const router = useRouter();
  const languageCode = useAppSelector(selectLanguageCode);
  const { t } = useTranslation('account');

  const [dynamicLink, setDynamicLink] = useState(`/${languageCode}/account`);

  useEffect(() => {
    if (window.matchMedia('(max-width: 576px)').matches) setDynamicLink(`/${languageCode}/account/edit`);
  }, []);

  return (
    <Wrapper>
      <LinkContainer>
        <FlagImage>
          {customerData.name
            .split(' ')
            .map((i) => i[0])
            .join('')}
        </FlagImage>

        <Link href={dynamicLink} active={router.pathname === '/account'}>
          {t('@profile')}
          <ActiveUnderline active={router.pathname === '/account'} />
        </Link>
        <Link href={`/${languageCode}/account/order-history`} active={router.pathname === '/account/order-history'}>
          {t('@my-orders')}
          <ActiveUnderline active={router.pathname === '/account/order-history'} />
        </Link>
        <Link href={`/${languageCode}/account/addresses`} active={router.pathname === '/account/addresses'}>
          {t('@address')}
          <ActiveUnderline active={router.pathname === '/account/addresses'} />
        </Link>

        <LougoutButton href="/logout">{t('@logout')}</LougoutButton>
      </LinkContainer>
    </Wrapper>
  );
};

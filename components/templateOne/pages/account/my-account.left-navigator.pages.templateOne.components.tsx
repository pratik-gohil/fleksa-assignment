import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import PencilIconPath from '../../../../public/assets/svg/pencil.svg';

const Wrapper = styled.div`
  background: ${(p) => p.theme.textDarkColor};
  width: 30%;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  position: relative;

  ::after {
    content: '';
    width: 3rem;
    height: 100%;
    position: absolute;
    background: ${(p) => p.theme.primaryColor};
    top: 0;
    right: 0;
  }

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
  padding: 2rem 0;

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

  padding: 1rem 0 0 0;

  &:hover {
    color: ${(p) => p.theme.primaryColor};
  }
`;

const LougoutButton = styled.button`
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

const PencilIcon = styled(PencilIconPath)`
  font-size: 1.2rem;
  color: ${(p) => p.theme.textDarkColor};
`;

const IconContainer = styled.a`
  border-radius: 50%;
  width: 34px;
  height: 34px;
  border: 1px solid #dddddd;
  display: none;
  place-items: center;
  cursor: pointer;
  background: #fff;

  position: absolute;
  right: -0.5rem;
  bottom: 0;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: grid;
  }
`;

export const MyAccountLeftSection = () => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <Wrapper>
      <LinkContainer>
        <FlagImage>
          {customerData.name
            .split(' ')
            .map((i) => i[0])
            .join('')}

          <IconContainer href="/account/edit">
            <PencilIcon />
          </IconContainer>
        </FlagImage>

        <Link href="#" active={true}>
          Profile
          <ActiveUnderline active={true} />
        </Link>
        <Link href="#" active={false}>
          My Orders
          <ActiveUnderline active={false} />
        </Link>
        <Link href="#" active={false}>
          Address
          <ActiveUnderline active={false} />
        </Link>

        <LougoutButton>Log out</LougoutButton>
      </LinkContainer>
    </Wrapper>
  );
};

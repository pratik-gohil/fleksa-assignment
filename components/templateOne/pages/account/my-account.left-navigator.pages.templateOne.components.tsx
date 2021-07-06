import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';

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
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem 0;

  width: calc(100% - 3rem);
  height: 100%;
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
`;

const LougoutButton = styled.button`
  color: ${(props) => props.theme.textLightActiveColor};
  padding: 1rem;
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

  return (
    <Wrapper>
      <LinkContainer>
        <FlagImage>
          {customerData.name
            .split(' ')
            .map((i) => i[0])
            .join('')}
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

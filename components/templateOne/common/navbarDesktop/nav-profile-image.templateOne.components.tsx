import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';

const ProfileLink = styled.a``;

const FlagContainer = styled.div`
  padding: 0 ${(props) => props.theme.dimen.X4}px;
`;

const FlagImage = styled.p`
  width: 36px;
  height: 36px;
  border-radius: 40px;
  border: 1px solid #efefef;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${(props) => props.theme.primaryColor};
  background-color: #444;
  text-transform: uppercase;
  margin: 0;
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0;
    padding: 0;
  }
`;

const NavUserProfile = ({}) => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <ProfileLink href="/account">
      <FlagContainer>
        <FlagImage>
          {customerData.name
            .split(' ')
            .map((i) => i[0])
            .slice(0, 2)
            .join('')}
        </FlagImage>
      </FlagContainer>
    </ProfileLink>
  );
};

export default NavUserProfile;

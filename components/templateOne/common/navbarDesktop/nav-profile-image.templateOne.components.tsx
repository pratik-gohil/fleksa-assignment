import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';

const ProfileLink = styled.a``;

const FlagContainer = styled.div`
  padding: 0 ${(props) => props.theme.dimen.X4}px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-left: 1.5rem;
    padding: 0;
  }
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
  background-color: #000;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    background-color: #fff;
    margin: 0;
    color: ${(props) => props.theme.textDarkColor};
    padding: 0;
  }
`;

const NavUserProfile = ({}) => {
  const languageCode = useAppSelector(selectLanguageCode)
  const customerData = useAppSelector(selectCustomer);

  return (
    <ProfileLink href={`${languageCode}/account`}>
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

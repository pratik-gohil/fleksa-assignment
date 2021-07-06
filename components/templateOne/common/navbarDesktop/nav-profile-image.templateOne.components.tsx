import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';

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
`;

const NavUserProfile = ({}) => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <a href="/account">
      <FlagContainer>
        <FlagImage>
          {customerData.name
            .split(' ')
            .map((i) => i[0])
            .join('')}
        </FlagImage>
      </FlagContainer>
    </a>
  );
};

export default NavUserProfile;

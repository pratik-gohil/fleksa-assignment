import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';
import { MyAccountLeftSection } from '../my-account.left-navigator.pages.templateOne.components';
import { MyAccountRightSection } from '../my-account.right-navigator.pages.templateOne.components';

const WrapperSection = styled.section`
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  width: 70%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const AccountPageMyAccount: FunctionComponent = ({}) => {
  return (
    <WrapperSection>
      <Row>
        <MyAccountLeftSection />

        <RightContainer>
          <MyAccountRightSection />
        </RightContainer>
      </Row>
    </WrapperSection>
  );
};

export default AccountPageMyAccount;

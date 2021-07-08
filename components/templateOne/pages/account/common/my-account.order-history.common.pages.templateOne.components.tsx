import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';
import { MyAccountLeftSection } from '../my-account.left-navigator.pages.templateOne.components';
import { MyAccountAllOrderHistory } from '../my-account.order-history.pages.templateOne.components';

const WrapperSection = styled.section`
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  width: 70%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const LeftContainer = styled.div`
  width: 30%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const AccountPageMyAccount: FunctionComponent = ({}) => {
  return (
    <WrapperSection>
      <Row>
        <LeftContainer>
          <MyAccountLeftSection />
        </LeftContainer>

        <RightContainer>
          <MyAccountAllOrderHistory />
        </RightContainer>
      </Row>
    </WrapperSection>
  );
};

export default AccountPageMyAccount;

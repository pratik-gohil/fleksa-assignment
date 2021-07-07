import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { MyAccountRightSection } from './my-account.right-navigator.pages.templateOne.components';

const WrapperSection = styled.section`
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  display: none;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: block;
    width: 100%;
  }
`;

const AccountPageMyEditAccount: FunctionComponent = ({}) => {
  return (
    <WrapperSection>
      <Row>
        <RightContainer>
          <MyAccountRightSection />
        </RightContainer>
      </Row>
    </WrapperSection>
  );
};

export default AccountPageMyEditAccount;

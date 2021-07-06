import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { MyAccountLeftSection } from './my-account.left-navigator.pages.templateOne.components';
import { MyAccountRightSection } from './my-account.right-navigator.pages.templateOne.components';

const WrapperSection = styled.section`
  border-bottom: ${(props) => props.theme.border};
`;

const Row = styled.div`
  display: flex;
`;

const AccountPageMyAccount: FunctionComponent = ({}) => {
  return (
    <WrapperSection>
      <Row>
        <MyAccountLeftSection />

        <MyAccountRightSection />
      </Row>
    </WrapperSection>
  );
};

export default AccountPageMyAccount;

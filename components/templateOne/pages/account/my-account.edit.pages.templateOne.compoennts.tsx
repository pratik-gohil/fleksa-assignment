import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { MyAccountRightSection } from './my-account.right-navigator.pages.templateOne.components';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    if (!window.matchMedia('(max-width: 576px)').matches) router.push('/account');
  }, []);

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

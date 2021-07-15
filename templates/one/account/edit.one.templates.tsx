import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import AccountPageMyAccount from '../../../components/templateOne/pages/account/common/my-account.edit.common.pages.templateOne.compoennts';

const MyAccountPageContainer = styled.div``;

const AccountEditPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <MyAccountPageContainer>
      <AccountPageMyAccount />
    </MyAccountPageContainer>
  );
};

export default AccountEditPageTemplateOne;

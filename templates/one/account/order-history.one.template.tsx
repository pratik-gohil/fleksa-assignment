import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import AccountPageMyAccount from '../../../components/templateOne/pages/account/common/my-account.order-history.common.pages.templateOne.components';
import { Snackbar } from '../../../components/templateOne/common/snackbar/snackbar.error.pages.templateOne.components';

const MyAccountPageContainer = styled.div``;

const AccountEditPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <MyAccountPageContainer>
      <AccountPageMyAccount />
    </MyAccountPageContainer>
  );
};

export default AccountEditPageTemplateOne;

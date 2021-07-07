import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import AccountPageMyAccount from '../../../components/templateOne/pages/account/my-account.common.pages.templateOne.components';
import { Snackbar } from '../../../components/templateOne/common/snackbar/snackbar.error.pages.templateOne.components';

const MyAccountPageContainer = styled.div``;

const AccountPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <MyAccountPageContainer>
      <AccountPageMyAccount />
      <Snackbar />
    </MyAccountPageContainer>
  );
};

export default AccountPageTemplateOne;

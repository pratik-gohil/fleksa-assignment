import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import {
  selectCustomer,
  updateCustomerCountryCode,
  updateCustomerEmail,
  updateCustomerName,
  updateCustomerPhone,
} from '../../../../redux/slices/user.slices.redux';
import EditButton from './edit-button.checkout.pages.templateOne.components';
import EditContainer from './edit-container.checkout.pages.templateOne.components';

export const StyledCheckoutCard = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  margin: ${(props) => props.theme.dimen.X4}px 0;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
`;

export const StyledCheckoutTitle = styled.h3`
  margin: 0;
  padding-bottom: ${(props) => props.theme.dimen.X4}px;
`;

export const StyledCheckoutInput = styled.input`
  flex: 2;
  max-width: 100%;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  font-size: 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 60%;
  }
`;

export const StyledCheckoutText = styled.p`
  display: flex;
  flex: 2 0 0;
  max-width: 100%;
  padding: ${(props) => props.theme.dimen.X4}px 0;
  margin: 0;
  word-wrap: break-word;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const Text = styled.p`
  min-width: 200px;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  flex: 2;
  gap: 15px;
`;

const StyledCheckoutInputCountryCode = styled.input`
  width: 20%;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  font-size: 1rem;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledCheckoutInputPhone = styled(StyledCheckoutInputCountryCode)`
  width: 80%;
`;

const CheckoutPageCustomerInfo: FunctionComponent = ({}) => {
  const userData = useAppSelector(selectCustomer);
  const { t } = useTranslation('page-checkout');
  const [editableName, setEditableName] = useState(!userData.name);
  const [editableEmail, setEditableEmail] = useState(!userData.email);
  const [editablePhone, setEditablePhone] = useState(!userData.phone);

  const dispatch = useAppDispatch();

  return (
    <StyledCheckoutCard>
      <EditContainer>
        <Text>{t('@name')}</Text>

        {editableName || !userData.name ? (
          <StyledCheckoutInput
            type="text"
            placeholder="Name"
            value={userData.name}
            onBlur={() => setEditableName(!userData.name)}
            onChange={(e) => dispatch(updateCustomerName(e.target.value))}
          />
        ) : (
          <StyledCheckoutText>{userData.name}</StyledCheckoutText>
        )}

        <EditButton onClick={() => setEditableName(!editableName)} />
      </EditContainer>

      <EditContainer>
        <Text>{t('@email')}</Text>

        {editableEmail || !userData.email ? (
          <StyledCheckoutInput
            type="text"
            placeholder="Email"
            value={userData.email || ''}
            onBlur={() => setEditableEmail(!userData.email)}
            onChange={(e) => {
              const trimedEmail = e.target.value.replace(/\s/g, '');
              dispatch(updateCustomerEmail(trimedEmail));
            }}
          />
        ) : (
          <StyledCheckoutText>{userData.email}</StyledCheckoutText>
        )}

        <EditButton onClick={() => setEditableEmail(!editableEmail)} />
      </EditContainer>

      <EditContainer>
        <Text>{t('@phone')}</Text>

        {editablePhone || !userData.country_code || !userData.phone ? (
          <PhoneInputContainer>
            <StyledCheckoutInputCountryCode
              type="number"
              placeholder="+49"
              value={userData.country_code || ''}
              onChange={(e) => {
                const trimedCountryCode = e.target.value.replace(/\s/g, '');
                dispatch(updateCustomerCountryCode(trimedCountryCode));
              }}
            />

            <StyledCheckoutInputPhone
              type="number"
              placeholder="Phone"
              value={userData.phone || ''}
              onBlur={() => setEditablePhone(!userData.phone)}
              onChange={(e) => {
                const trimedPhone = e.target.value.replace(/\s/g, '');
                dispatch(updateCustomerPhone(trimedPhone));
              }}
            />
          </PhoneInputContainer>
        ) : (
          <StyledCheckoutText>
            +{userData.country_code} {userData.phone}
          </StyledCheckoutText>
        )}

        <EditButton onClick={() => setEditablePhone(!editablePhone)} />
      </EditContainer>
    </StyledCheckoutCard>
  );
};

export default CheckoutPageCustomerInfo;

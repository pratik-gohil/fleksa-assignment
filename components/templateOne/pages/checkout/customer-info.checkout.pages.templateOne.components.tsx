import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

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
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { isEmailValid } from '../../../../utils/checkout.utils';
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

  /* 
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0;
    box-shadow: none;
    border: none;
    padding: 0;
  } */
`;

export const StyledCheckoutTitle = styled.h3`
  margin: 0;
  padding: 0;

  span {
    font-size: clamp(0.8rem, 1.2rem, 1vw);
  }
`;

export const StyledCheckoutInput = styled.input`
  flex: 2;
  max-width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: ${(p) => p.theme.borderRadius}px;
  padding: 1rem;
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
  display: flex;
  align-items: center;

  span {
    font-size: clamp(0.7rem, 0.8rem, 1vw);
    padding: 0.3rem;
  }

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Text = styled.p`
  min-width: 200px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const PhoneInputContainer = styled.div`
  display: flex;
  flex: 2;
  gap: 15px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    gap: 10px;
  }
`;

const CheckoutPageCustomerInfo: FunctionComponent = ({}) => {
  const userData = useAppSelector(selectCustomer);
  const { t } = useTranslation('page-checkout');
  const [editableName, setEditableName] = useState(!userData.name);
  const [editableEmail, setEditableEmail] = useState(!userData.email);
  const [editablePhone, setEditablePhone] = useState(!userData.phone);
  const [phone, setPhone] = useState(`${userData.country_code}${userData.phone}` || '');
  const [countryCode, setCountryCode] = useState<number>(49);
  const [isErrorField, setIsErrorField] = useState({
    email: false,
    name: false,
  });

  const dispatch = useAppDispatch();

  const handleEmailOnBlurEvent = async () => {
    amplitudeEvent(constructEventName(`customer-info-email}`, 'input'), {
      email: userData.email,
      length: userData.email ? userData?.email.length || 0 : 0,
    });

    const check = !isEmailValid(userData?.email || '');
    setIsErrorField({
      ...isErrorField,
      email: check,
    });

    if (check) return; // ? if check false don't switch to edit mode

    setEditableEmail(!editableEmail);
  };

  return (
    <StyledCheckoutCard>
      <EditContainer>
        <Text>{t('@name')}</Text>

        {editableName || !userData.name ? (
          <StyledCheckoutInput
            type="text"
            placeholder="Name"
            value={userData.name}
            onBlur={() => {
              setEditableName(!userData.name);
              amplitudeEvent(constructEventName(`customer-info-Name}`, 'input'), {
                username: userData.name,
                length: userData.name.length,
              });
            }}
            onChange={(e) => dispatch(updateCustomerName(e.target.value))}
          />
        ) : (
          <StyledCheckoutText>{userData.name}</StyledCheckoutText>
        )}

        <EditButton
          onClick={() => {
            setEditableName(!editableName);
            amplitudeEvent(constructEventName(`customer info name edit`, 'icon-button'), {
              currentEmail: userData.name,
            });
          }}
        />
      </EditContainer>

      <EditContainer>
        <Text>{t('@email')}</Text>

        {editableEmail ? (
          <StyledCheckoutInput
            type="text"
            placeholder="Email"
            value={userData.email || ''}
            onBlur={handleEmailOnBlurEvent}
            onChange={(e) => {
              const trimedEmail = e.target.value.replace(/\s/g, '');

              dispatch(updateCustomerEmail(trimedEmail));
            }}
          />
        ) : (
          <StyledCheckoutText>{userData.email}</StyledCheckoutText>
        )}

        <EditButton
          onClick={() => {
            if (!isEmailValid(userData?.email || '')) return;

            setEditableEmail(!editableEmail);
            amplitudeEvent(constructEventName(`customer info email edit`, 'icon-button'), {
              currentEmail: userData.email,
            });
          }}
        />
      </EditContainer>

      <EditContainer>
        <Text>{t('@phone')}</Text>

        <PhoneInputContainer>
          {editablePhone ? (
            <PhoneInput
              country={'de'}
              value={phone}
              enableSearch
              specialLabel=""
              onBlur={() => {
                if (phone.length < 8) return;

                setEditablePhone(!editablePhone);
                amplitudeEvent(constructEventName(`customer-info-phone`, 'input'), {
                  email: phone,
                  length: phone.length,
                });
              }}
              onChange={(ph, data) => {
                if ((data as any).dialCode !== countryCode) {
                  setCountryCode((data as any).dialCode);
                  dispatch(updateCustomerCountryCode((data as any).dialCode));
                }

                setPhone(ph);
                dispatch(updateCustomerPhone(ph.replace((data as any).dialCode, ''))); // ? Update the code without country code
              }}
              inputStyle={{ width: '100%', position: 'relative' }}
            />
          ) : (
            <StyledCheckoutText>
              +{userData.country_code} {userData.phone}
            </StyledCheckoutText>
          )}
        </PhoneInputContainer>

        <EditButton
          onClick={() => {
            if (phone.length < 8) return;

            setEditablePhone(!editablePhone);
            amplitudeEvent(constructEventName(`customer info phone edit`, 'icon-button'), {
              currentEmail: phone,
            });
          }}
        />
      </EditContainer>
    </StyledCheckoutCard>
  );
};

export default CheckoutPageCustomerInfo;

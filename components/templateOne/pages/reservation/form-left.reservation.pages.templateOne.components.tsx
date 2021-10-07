import 'react-phone-input-2/lib/material.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import styled, { css } from 'styled-components';
import NodeApiHttpPostRervation from '../../../../http/nodeapi/reservation/post.reservation.nodeapi.http';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import LoginAllPages from '../../common/login/login.common.templateOne.components';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import { selectConfiguration, updateShowLogin } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { selectBearerToken, selectCustomer, selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import { ILabelValue } from '../../../../utils/restaurant-timings.utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

const Wrapper = styled.div``;
const FormContainer = styled.div``;
const InputBox = styled.div`
  padding: 0 0 1rem 0;
`;
const Label = styled.p`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 600;
  padding: 0 0 0.4rem 0;
  margin: 0;
`;

const BaseInputStyle = css`
  display: inline-block;
  font-size: 1rem;
  padding: 1rem;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: 300;
  color: ${(p) => p.theme.textDarkColor};
  width: 100%;
`;

const Input = styled.input`
  ${BaseInputStyle}

  transition: border 0.2s linear;

  &::placeholder {
    font-weight: 300;
  }

  &[type='date'],
  &[type='time'] {
    max-width: 400px;
    user-select: none;
    font-family: inherit;
    background-color: white;
  }

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${(p) => p.theme.textDarkActiveColor};
  }
`;

const InputTextBox = styled(InputBox)`
  padding-bottom: 0.5rem;
`;

const Textarea = styled.textarea`
  ${BaseInputStyle}
  padding: 1rem;
  margin: 0;
  resize: both;
  min-height: 10ch;
  max-height: 15ch;
`;

const Acknowledgement = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${(p) => p.theme.textDarkColor};
  width: max-content;
  padding: 0;
  margin: 0;
  width: 95%;
`;

const LinkText = styled.a`
  text-decoration: underline;
`;

const ReservationButton = styled.button`
  padding: 1rem 0;
  font-size: 1em;
  font-weight: 600;
  color: white;
  background-color: ${(p) => (p.disabled ? 'rgba(0, 0, 0, 0.4)' : p.theme.textDarkColor)};
  width: 100%;
  margin: 0 auto;
  border: none;
  outline: none;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    filter: ${(p) => (p.disabled ? 'brightness(1)' : 'brightness(1.3)')};
  }

  @media (min-width: 576px) {
    width: 100%;
  }
`;

const ButtonText = styled.span``;

interface IFormLeftInputsProps {
  date: string;
  time: ILabelValue;
  totalGuest: string;
  shopId: null | number;
}

const FormLeftInputs = ({ date, time, totalGuest, shopId }: IFormLeftInputsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const shopData = useAppSelector(selectShop);
  const customerData = useAppSelector(selectCustomer);
  const addressData = useAppSelector(selectAddress);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const siblings = useAppSelector(selectSiblings);

  const { t } = useTranslation('reservation');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [countryCode, setCountryCode] = useState<number>(49);
  const [loading, setLoading] = useState(false);

  const customFieldError = (message: string) => {
    dispatch(
      updateError({
        show: true,
        message: message,
        severity: 'error',
      }),
    );
    return;
  };

  const handleReserveButtonClick = async () => {
    try {
      amplitudeEvent(constructEventName(`reserve now`, 'button'), {
        name,
        email,
        countryCode,
        phone,
      });

      if (!name) return customFieldError(t('@enter-name'));
      if (!email) return customFieldError(t('@enter-email'));
      if (!countryCode || !phone) return customFieldError(t('@enter-phone'));

      if (!bearerToken) {
        dispatch(updateShowLogin(true));
        return;
      } else dispatch(updateShowLogin(false));

      setLoading(true);

      const response = await new NodeApiHttpPostRervation(configuration, bearerToken as any).post({
        countryCode: `${countryCode}`,
        phone: phone.substring(String(countryCode).length),
        shop_id: shopData?.id as unknown as number,
        description: comment,
        email,
        name,
        date_time: moment(`${date} ${time.value}`).format(),
        guests_count: totalGuest,
        shop: {
          is_multi: !!siblings.length,
          id: shopId,
        },
      });

      setLoading(false);
      if (!response.result) {
        amplitudeEvent(constructEventName(`reserve now error`, 'response'), response);

        dispatch(
          updateError({
            show: true,
            message: response.message,
            severity: 'error',
          }),
        );
        return;
      }

      amplitudeEvent(constructEventName(`reserve now success`, 'response'), response);

      // TODO: Resert inputs
      setPhone('');
      setEmail('');
      setComment('');
      setName('');
      setCountryCode(49);

      // TODO: Redirect to success page
      router.push('/reservation-success');
    } catch (e) {
      amplitudeEvent(constructEventName(`reserve now error catch`, 'error'), { error: e });

      console.error('error : ', e);
      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    }
  };

  // TODO: Pre filling if logged in user
  useEffect(() => {
    if (isLoggedIn) {
      setPhone(`${customerData.country_code}${customerData.phone}`);
      setEmail(customerData?.email || '');
      setName(customerData.name);
    }
  }, []);

  return (
    <Wrapper>
      <FormContainer>
        <InputBox>
          <Label>{t('@name')}</Label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            onBlur={() => {
              amplitudeEvent(constructEventName(`name`, 'input'), {
                email: name,
                length: name.length,
              });
            }}
          />
        </InputBox>

        <InputBox>
          <Label>{t('@email')}</Label>
          <Input
            type="email"
            placeholder="john@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            onBlur={() => {
              amplitudeEvent(constructEventName(`email`, 'input'), {
                email: email,
                length: email.length,
              });
            }}
          />
        </InputBox>

        <InputBox>
          <Label>{t('@phone')}</Label>

          <PhoneInput
            country={'de'}
            value={phone}
            enableSearch
            specialLabel=""
            onChange={(ph, data) => {
              if ((data as any).dialCode !== countryCode) {
                setCountryCode((data as any).dialCode);
              }
              setPhone(ph);
            }}
            inputStyle={{ width: '100%' }}
            onBlur={() => {
              amplitudeEvent(constructEventName(`phone`, 'input'), {
                email: phone,
                length: phone.length,
              });
            }}
          />
        </InputBox>

        <InputTextBox>
          <Label>{t('@comments')}</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onBlur={() => {
              amplitudeEvent(constructEventName(`comments`, 'input'), {
                email: comment,
                length: comment.length,
              });
            }}
          />
        </InputTextBox>

        <Acknowledgement>
          {t('@agreement')} <LinkText href="#">{t('@terms')}</LinkText> {t('@and')} <LinkText href="#">{t('@policy')}</LinkText>
        </Acknowledgement>

        <ReservationButton onClick={handleReserveButtonClick} type="button" disabled={!addressData?.has_reservations}>
          {loading ? <LoadingIndicator width={20} /> : <ButtonText> {t('@reserve-now')} </ButtonText>}
        </ReservationButton>

        <LoginAllPages callback={handleReserveButtonClick} />
      </FormContainer>
    </Wrapper>
  );
};

export default FormLeftInputs;

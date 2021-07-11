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
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import { selectBearerToken, selectCustomer, selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import { ILabelValue } from '../../../../utils/restaurant-timings.utils';
import { useRouter } from 'next/router';

const Wrapper = styled.div``;
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
  background-color: ${(p) => p.theme.textDarkColor};
  width: 100%;
  margin: 0 auto;
  border: none;
  outline: none;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    filter: brightness(1.3);
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
}

const FormLeftInputs = ({ date, time, totalGuest }: IFormLeftInputsProps) => {
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const shopData = useAppSelector(selectShop);
  const customerData = useAppSelector(selectCustomer);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [countryCode, setCountryCode] = useState<number>(49);
  const [loading, setLoading] = useState(false);

  const handleReserveButtonClick = async () => {
    try {
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
      });

      setLoading(false);
      if (!response.result) {
        dispatch(
          updateError({
            show: true,
            message: response.message,
            severity: 'error',
          }),
        );
        return;
      }

      // TODO: Resert inputs
      setPhone('');
      setEmail('');
      setComment('');
      setName('');
      setCountryCode(49);

      // TODO: Redirect to success page
      router.push('/reservation-success');
    } catch (e) {
      console.error('error : ', e);
      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: 'Ooops! Something went wrong.',
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
      <InputBox>
        <Label>Name</Label>
        <Input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required={true} />
      </InputBox>

      <InputBox>
        <Label>Email</Label>
        <Input type="email" placeholder="john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
      </InputBox>

      <InputBox>
        <Label>Phone Number</Label>

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
        />
      </InputBox>

      <InputTextBox>
        <Label>Comments</Label>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </InputTextBox>

      <Acknowledgement>
        By continuing, you agree to Fleksa's <LinkText href="#">Terms of use</LinkText> and <LinkText href="#">Privacy Policy</LinkText>
      </Acknowledgement>

      <ReservationButton onClick={handleReserveButtonClick} type="submit">
        {loading ? <LoadingIndicator width={20} /> : <ButtonText> Reserve Now </ButtonText>}
      </ReservationButton>

      <LoginAllPages callback={handleReserveButtonClick} />
    </Wrapper>
  );
};

export default FormLeftInputs;

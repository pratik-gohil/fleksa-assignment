import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import PhoneInput from 'react-phone-input-2';
import NodeApiHttpPostLogin from '../../../../http/nodeapi/login/post.login.nodeapi.http';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import NodeApiHttpPostVerify from '../../../../http/nodeapi/verify/post.verify.nodeapi.http';
import { COOKIE_BEARER_TOKEN } from '../../../../constants/keys-cookies.constants';
import { updateBearerToken } from '../../../../redux/slices/user.slices.redux';
import { selectConfiguration } from '../../../../redux/slices/configuration.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface IPropsLoginComponent {
  onLogin(): void;
}

const LoginContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const SectionOne = styled.section`
  position: relative;
  height: 400px;
  display: none;
  flex: 1;
  background-color: #f9f9f9;
  border-top-left-radius: ${(props) => props.theme.borderRadius}px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius}px;
  overflow: hidden;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: flex;
  }
`;

const SectionTwo = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 24px 0;
  background-color: #fff;
  border-radius: ${(props) => props.theme.borderRadius}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Title = styled.h2`
  font-size: 16;
  margin: 0;
  padding: 0 24px 24px 24px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0 24px;
`;

const InputContainer = styled.div`
  margin: 24px;
`;

const SendOtpButtonContainer = styled.div`
  margin: 0 24px;
  text-align: center;
`;

const SendOtpButton = styled.button`
  display: flex;
  flex: 1 1 auto;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.primaryColor};
  padding: 12px 24px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  justify-content: center;
  cursor: pointer;
  width: 100%;
`;

const SendOtpButtonText = styled.p`
  display: inline-block;
  font-weight: 800;
  font-size: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const OTP_LENGTH = 5

const LoginComponent: FunctionComponent<IPropsLoginComponent> = ({ onLogin }) => {
  const [, setCookie] = useCookies([COOKIE_BEARER_TOKEN]);
  const shopData = useAppSelector(selectShop);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<number>(49);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState<number | undefined>();

  const router = useRouter();

  async function finishLogin(bearerToken: string) {
    dispatch(updateBearerToken(bearerToken));
    setCookie(COOKIE_BEARER_TOKEN, bearerToken, {
      httpOnly: false,
      path: '/',
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async function onTapSendOtp() {
    setLoading(true);
    try {
      const response = await new NodeApiHttpPostLogin(configuration).post({
        countryCode,
        phone: phone.substring(String(countryCode).length),
        shopId: shopData?.id as unknown as number,
      });

      if (!response?.result) {
        dispatch(
          updateError({
            show: true,
            message: response?.message,
            severity: 'error',
          }),
        );
        return;
      }

      setCustomerId(response?.customer_id);
    } catch (error) {
      console.error(error);
      dispatch(
        updateError({
          show: true,
          message: 'Ooops! Something went wrong.',
          severity: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  async function onTapLogin() {
    setLoading(true);
    try {
      if (customerId) {
        const response = await new NodeApiHttpPostVerify(configuration).post({
          otp,
          customerId,
          shopId: shopData?.id as unknown as number,
        });

        if (!response?.result) {
          dispatch(
            updateError({
              show: true,
              message: response?.message,
              severity: 'error',
            }),
          );
          return;
        }

        await finishLogin(response.token);
        // on login callback is present call it, otherwise send the user to account page
        onLogin ? onLogin() : router.push('/account');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        updateError({
          show: true,
          message: 'Ooops! Something went wrong.',
          severity: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      onTapLogin()
    }
  }, [ otp ])

  return (
    <LoginContainer>
      <SectionOne>{shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}</SectionOne>
      <SectionTwo>
        {customerId ? (
          <>
            <Title>Enter OTP</Title>
            <Text>
              Please enter OTP sent at +{phone}
            </Text>
            <InputContainer>
              <OtpInput
                isInputNum={true}
                shouldAutoFocus={true}
                value={otp}
                onChange={(otp: React.SetStateAction<string>) => {
                  setOtp(otp);
                }}
                numInputs={OTP_LENGTH}
                containerStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                inputStyle={{
                  fontFamily: "Poppins",
                  display: 'inline-block',
                  fontSize: "42px",
                  margin: '0 8px',
                  padding: 0,
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 4,
                  color: '#222',
                }}
              />
            </InputContainer>
            <SendOtpButtonContainer>
              <SendOtpButton onClick={onTapLogin}>
                {loading ? <LoadingIndicator width={20} /> : <SendOtpButtonText>LOGIN</SendOtpButtonText>}
              </SendOtpButton>
            </SendOtpButtonContainer>
            <SendOtpButtonContainer style={{ marginTop: 24 }}>
              OTP not received? <SendOtpButtonText onClick={onTapSendOtp}>Resend</SendOtpButtonText>
            </SendOtpButtonContainer>
          </>
        ) : (
          <>
            <Title>Login with Phone Number</Title>
            <Text>Please enter your phone number to get the OTP</Text>
            <InputContainer>
              <PhoneInput
                country={'de'}
                value={phone}
                enableSearch
                onChange={(ph, data) => {
                  if ((data as any).dialCode !== countryCode) {
                    setCountryCode((data as any).dialCode);
                  }
                  setPhone(ph);
                }}
                inputStyle={{ width: '100%' }}
              />
            </InputContainer>
            <SendOtpButtonContainer>
              <SendOtpButton onClick={onTapSendOtp}>
                {loading ? <LoadingIndicator width={20} /> : <SendOtpButtonText>SEND OTP</SendOtpButtonText>}
              </SendOtpButton>
            </SendOtpButtonContainer>
          </>
        )}
      </SectionTwo>
    </LoginContainer>
  );
};

export default LoginComponent;

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
import { selectConfiguration, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import SvgBack from '../../../../public/assets/svg/back.svg';
import { useTranslation } from 'next-i18next';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { IUpgradedCredential } from '../../../../interfaces/common/login.common.interfaces';

export interface IPropsLoginComponent {
  onLogin(): void;
}

const LoginContainer = styled.div`
  display: flex;
  box-shadow: rgba(145, 145, 202, 0.2) 0px 7px 29px 0px;
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
  margin: 0;
  padding: 20px;
  margin-top: -24px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0 24px;
`;

const InputContainer = styled.div`
  margin: 56px 24px 24px 24px;
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
  margin-bottom: 0;
`;

const VerifyOtpButton = styled(SendOtpButton)`
  margin-bottom: 0;
`;

const SendOtpButtonText = styled.p`
  display: inline-block;
  font-weight: 800;
  font-size: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const OTPTopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.div`
  display: inline-block;
  padding: 0 1rem 0 0;
  width: 50px;
  cursor: pointer;
  margin-top: -24px;
  svg {
    display: block;
    width: 36px;
    height: 36px;
  }
`;

const OTP_LENGTH = 5;

const LoginComponent: FunctionComponent<IPropsLoginComponent> = ({ onLogin }) => {
  const [, setCookie] = useCookies([COOKIE_BEARER_TOKEN]);
  const shopData = useAppSelector(selectShop);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<number>(49);
  const [loading, setLoading] = useState(false);
  const [otpBig, setOtpBig] = useState(false);
  const [customerId, setCustomerId] = useState<number | undefined>();
  const { t } = useTranslation('login');
  const languageCode = useAppSelector(selectLanguageCode);

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
    let phoneNumber = phone.substring(String(countryCode).length);

    amplitudeEvent(constructEventName(`onTapSendOtp`, 'button'), { phoneNumber });

    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1);
      setPhone(countryCode + phoneNumber);
    }

    try {
      if (phoneNumber.length < 9 || phoneNumber.length > 11) {
        dispatch(
          updateError({
            show: true,
            message: 'Invalid phone number',
            severity: 'error',
          }),
        );
        return;
      }
      const response = await new NodeApiHttpPostLogin(configuration).post({
        countryCode,
        phone: phoneNumber,
        shopId: shopData?.id as unknown as number,
        languageCode,
      });

      if (!response?.result) {
        dispatch(
          updateError({
            show: true,
            message: response?.message,
            severity: 'error',
          }),
        );

        amplitudeEvent(constructEventName(`onTapSendOtp error`, 'response'), response);

        return;
      }

      amplitudeEvent(constructEventName(`onTapSendOtp success`, 'response'), response);

      setCustomerId(response?.customer_id);
    } catch (error) {
      console.error(error);
      amplitudeEvent(constructEventName(`onTapSendOtp error catch`, 'response'), error ?? {});

      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  async function onAutoTapLogin() {
    setLoading(true);
    try {
      if (customerId) {
        const response = await new NodeApiHttpPostVerify(configuration).post({
          otp,
          customerId,
          shopId: shopData?.id as unknown as number,
        });

        amplitudeEvent(constructEventName(`onAutoTapLogin`, 'method'), { otp, customerId, shopId: shopData?.id as unknown as number });

        if (!response?.result) {
          dispatch(
            updateError({
              show: true,
              message: response?.message,
              severity: 'error',
            }),
          );

          amplitudeEvent(constructEventName(`onAutoTapLogin error`, 'response'), response);

          return;
        }

        amplitudeEvent(constructEventName(`onAutoTapLogin success`, 'response'), response);

        await finishLogin(response.token);
        // on login callback is present call it, otherwise send the user to account page
        onLogin ? onLogin() : router.push('/account');
      }
    } catch (error) {
      console.error(error);
      amplitudeEvent(constructEventName(`onAutoTapLogin error catch`, 'error'), { error });

      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      onAutoTapLogin();
    }
  }, [otp]);

  // TODO: Otp width size depends on desktop width and prefill auto OTP on mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOtpBig(window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`).matches);

      // TODO: Officially support from Chrome +84
      if ('OTPCredential' in window) {
        console.log('WebOTP supported!.');
        amplitudeEvent(constructEventName(`auto fill otp support`, 'feature'), {});

        const ac = new AbortController();

        navigator.credentials
          .get({
            otp: { transport: ['sms'] },
            signal: ac.signal,
          } as CredentialRequestOptions)
          .then((otp: IUpgradedCredential | null) => {
            if (otp) {
              setOtp(otp?.code || '');
              amplitudeEvent(constructEventName(`auto filled otp success`, 'feature'), {});
            }
          })
          .catch((err) => {
            console.log(err);
            amplitudeEvent(constructEventName(`auto filled otp error`, 'feature'), { error: err });
          });
      } else {
        // amplitudeEvent(constructEventName(`auto fill otp not support`, 'feature'), {});

        console.log('WebOTP not supported!.');
      }
    }
  }, []);

  return (
    <LoginContainer>
      <SectionOne>{shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}</SectionOne>
      <SectionTwo>
        {customerId ? (
          <>
            <OTPTopContainer>
              <Title>{t('@enter-otp')}</Title>
              <BackButton
                onClick={() => {
                  setCustomerId(undefined);
                  amplitudeEvent(constructEventName(`back button`, 'button'), {});
                }}
              >
                <SvgBack />
              </BackButton>
            </OTPTopContainer>
            <Text>
              {t('@sent-at')} +{phone}
            </Text>
            <InputContainer style={{ margin: 24, display: 'flex', justifyContent: 'center' }}>
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
                  flex: 1,
                  justifyContent: 'space-between',
                  maxWidth: otpBig ? 500 : 300,
                  justifySelf: 'center',
                  alignSelf: 'center',
                }}
                inputStyle={{
                  fontFamily: 'Poppins',
                  display: 'inline-block',
                  fontSize: otpBig ? 60 : 40,
                  padding: 0,
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 4,
                  color: '#222',
                }}
              />
            </InputContainer>
            <SendOtpButtonContainer>
              <VerifyOtpButton onClick={onAutoTapLogin}>
                {loading ? <LoadingIndicator width={20} /> : <SendOtpButtonText>{t('@login')}</SendOtpButtonText>}
              </VerifyOtpButton>
            </SendOtpButtonContainer>
            <SendOtpButtonContainer style={{ marginTop: 24 }}>
              {t('@not-received')} <SendOtpButtonText onClick={onTapSendOtp}>{t('@resend')}</SendOtpButtonText>
            </SendOtpButtonContainer>
          </>
        ) : (
          <>
            <Title>{t('@title')}</Title>
            <Text>{t('@sub-title')}</Text>
            <InputContainer style={{ height: 58 }}>
              <PhoneInput
                country={'de'}
                value={phone}
                enableSearch
                specialLabel={t('@phone')}
                onChange={(ph, data) => {
                  if ((data as any).dialCode !== countryCode) {
                    setCountryCode((data as any).dialCode);
                  }
                  setPhone(ph);
                }}
                onBlur={() => {
                  amplitudeEvent(constructEventName(`phone`, 'input'), {
                    phone: phone,
                    length: phone.length,
                  });
                }}
                inputStyle={{ width: '100%', position: 'relative' }}
              />
            </InputContainer>
            <SendOtpButtonContainer>
              <SendOtpButton onClick={onTapSendOtp}>
                {loading ? <LoadingIndicator width={20} /> : <SendOtpButtonText>{t('@send-otp')}</SendOtpButtonText>}
              </SendOtpButton>
            </SendOtpButtonContainer>
          </>
        )}
      </SectionTwo>
    </LoginContainer>
  );
};

export default LoginComponent;

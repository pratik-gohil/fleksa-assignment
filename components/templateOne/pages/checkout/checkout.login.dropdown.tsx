import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { COOKIE_BEARER_TOKEN } from '../../../../constants/keys-cookies.constants';
import NodeApiHttpGetUserOrderHistory from '../../../../http/nodeapi/account/get.account.order-history.nodeapi.http';
import NodeApiHttpPostLogin from '../../../../http/nodeapi/login/post.login.nodeapi.http';
import NodeApiHttpPostVerify from '../../../../http/nodeapi/verify/post.verify.nodeapi.http';
import { IUpgradedCredential } from '../../../../interfaces/common/login.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { updateCheckoutIsOffersOpen, updateCheckoutLogin } from '../../../../redux/slices/checkout.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import { selectConfiguration, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import {
  selectCustomer,
  updateBearerToken,
  updateCustomerEmail,
  updateCustomerName,
  updateCustomerOrderHistory,
  updateCustomerPhone,
} from '../../../../redux/slices/user.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';

const OTP_LENGTH = 5;

const CheckoutLoginDropdown = () => {
  const { t } = useTranslation('page-checkout');
  const shopData = useAppSelector(selectShop);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(selectLanguageCode);
  const customerData = useAppSelector(selectCustomer);
  const [, setCookie] = useCookies([COOKIE_BEARER_TOKEN]);
  const el = useRef(null);

  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState(`${customerData.country_code}${customerData.phone}` || '');
  const [countryCode, setCountryCode] = useState<number>(customerData.country_code ? +customerData.country_code : 49);
  const [otpBig, setOtpBig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState<number | undefined>();

  async function finishLogin(bearerToken: string) {
    dispatch(updateBearerToken(bearerToken));
    setCookie(COOKIE_BEARER_TOKEN, bearerToken, {
      httpOnly: false,
      path: '/',
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(updateCheckoutLogin(false));
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
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
      amplitudeEvent(constructEventName(`onTapSendOtp error catch`, 'error'), error as unknown as {});
    } finally {
      setLoading(false);
    }
  }

  /**
   *
   * @returns verify the customer by make the verify request to node server
   */
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

        // TODO: Pre fill if data was not entered
        if (!customerData.email) dispatch(updateCustomerEmail(response?.email));
        if (!customerData.name) dispatch(updateCustomerName(response?.name));
        if (!customerData.phone) dispatch(updateCustomerPhone(phone));

        amplitudeEvent(constructEventName(`onAutoTapLogin success`, 'response'), response);

        // TODO: Updating customer history order information to the state
        const orderHistory = await new NodeApiHttpGetUserOrderHistory(configuration, response.token).get({
          shop_id: shopData?.id as unknown as number,
        });

        await finishLogin(response.token);

        if (orderHistory?.result) {
          await dispatch(updateCustomerOrderHistory(orderHistory.data.orders?.sort((a, b) => b.id - a.id)));

          // TODO: Open when first order login to show for applying promo code
          if (orderHistory.data.orders?.length === 0) dispatch(updateCheckoutIsOffersOpen(true));
        }
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

  // TODO: Auto otp sumbit
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
        amplitudeEvent(constructEventName(`auto fill otp not support`, 'feature'), {});

        console.log('WebOTP not supported!.');
      }
    }
  }, []);

  return (
    <>
      <LoginContainer>
        <Container>
          <Title>{t('@enter-request')}</Title>
          <InputContainer style={{ height: 58 }}>
            <PhoneInput
              country={'de'}
              value={phone}
              enableSearch
              specialLabel={t('@phone')}
              onBlur={() => {
                amplitudeEvent(constructEventName(`login-card`, 'input'), {
                  phone: phone,
                  length: phone.length,
                });
              }}
              onChange={(ph, data) => {
                if ((data as any).dialCode !== countryCode) {
                  setCountryCode((data as any).dialCode);
                }
                setPhone(ph);
              }}
              inputStyle={{ width: '100%', position: 'relative' }}
            />
          </InputContainer>
          <Description>
            {!customerId ? (
              t('@verification-quate-1')
            ) : (
              <>
                <EnterCode>{t('@enter-code')}</EnterCode>
                {`${t('@verification-quate-2')} ${phone} ${t('@verification-quate-2-i')}`}
              </>
            )}
          </Description>

          {!!customerId && (
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
                  margin: !otpBig ? '0.3rem' : 0,
                  padding: 0,
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 4,
                  color: '#222',
                }}
              />
            </InputContainer>
          )}
        </Container>

        <Button onClick={onTapSendOtp}>{loading ? <LoadingIndicator width={20} /> : !customerId ? t('@send') : t('@re-send')}</Button>
      </LoginContainer>
      <div id="el" ref={el} />
    </>
  );
};

export default CheckoutLoginDropdown;

const LoginContainer = styled.div`
  padding: 0 1rem 1rem 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0;
  }
`;

const Container = styled.div``;

const Title = styled.h4`
  padding: 0;
  margin: 0 0 1rem 0;
`;
const Description = styled.p`
  font-size: 1rem;
`;

const InputContainer = styled.div``;

const Button = styled.div`
  font-size: clamp(16px, 24px, 3vw);
  font-weight: 700;
  background-color: ${(p) => p.theme.primaryColor};
  display: grid;
  place-items: center;
  border-radius: 1000px;
  border: ${(p) => p.theme.border};
  cursor: pointer;
  min-height: 55px;
`;

const EnterCode = styled.span`
  display: block;
  font-weight: 600;
`;
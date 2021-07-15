import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer, updateCustomerName, updateCustomerEmail, updateCustomerEmailVerification } from '../../../../redux/slices/user.slices.redux';
import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import OtpInput from 'react-otp-input';
import { useTranslation } from 'next-i18next';
import NodeApiHttpPatchAccountProfileRequest from '../../../../http/nodeapi/account/post.account.nodeapi.http';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { selectConfiguration } from '../../../../redux/slices/configuration.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import PencilIconPath from '../../../../public/assets/svg/pencil.svg';
import InfoRedIconPath from '../../../../public/assets/svg/account/info_red.svg';
import MobileBackButton from '../../common/backButton/backButton.common.templateOne.components';
import NodeApiHttpPostVerifyEmailPhoneRequest from '../../../../http/nodeapi/account/post.send-verify-code.nodeapi.http';
import NodeApiHttpPostVerifyCodeRequest from '../../../../http/nodeapi/account/post.verify-code.nodeapi.http';

const Wrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  overflow: hidden;
  margin: 0.5rem 0 0 8rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
    margin: 0;
    padding: 2rem 0.5rem;
  }
`;

const ContentContainer = styled.div`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 2rem 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 1rem 0.5rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    max-width: 100%;

    margin: 1rem 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1.6rem;
  font-weight: 550;
  padding: 0;
  margin: 0;
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1.2rem;
  }
`;

const TextContainer = styled.div<{ readOnly: boolean }>`
  cursor: ${(p) => (p.readOnly ? 'not-allowed' : 'none')};
`;

const InputValue = styled.input<{ readOnly: boolean }>`
  outline: none;
  border: ${(p) => (!p.readOnly ? '1px solid #dddddd' : 'none')};
  border-radius: 0.5rem;
  margin-top: ${(p) => (!p.readOnly ? '1rem' : '0')};

  padding: ${(p) => (p.readOnly ? '1rem 1rem 1rem 0' : '1rem')};
  width: 100%;
  font-size: 1.2rem;
  cursor: ${(p) => (p.readOnly ? 'not-allowed' : 'text')};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
  }
`;

const TextEmailContainer = styled(TextContainer)`
  position: relative;
`;
const EmailInputValue = styled(InputValue)``;

const VerifyButton = styled.button<{ readOnly: boolean }>`
  position: absolute;
  width: 120px;
  height: calc(100% - 1rem);
  right: 0;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background: ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textLightActiveColor};
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  visibility: ${(p) => (p.readOnly ? 'hidden' : 'visible')};
  margin-top: ${(p) => (!p.readOnly ? '1rem' : '0')};

  &:hover {
    filter: brightness(1.3);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
    width: 90px;
  }
`;

const IconContainer = styled.div<{ readOnly: boolean }>`
  border-radius: 50%;
  width: 34px;
  height: 34px;
  border: 1px solid #dddddd;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: ${(p) => (!p.readOnly ? '#eeecec' : '#fff')};

  &:hover {
    background: #eeecec;
  }
`;

const PencilIcon = styled(PencilIconPath)`
  font-size: 1.2rem;
  color: ${(p) => p.theme.textDarkColor};
`;

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
`;

const InfoRedIcon = styled(InfoRedIconPath)`
  margin-left: 0.5rem;
`;

const NotVerifyIndigator = styled.div<{ readOnly: boolean; isEmailVerify: boolean }>`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  display: ${(p) => (p.readOnly && !p.isEmailVerify ? 'flex' : 'none')};
`;

const NotVerifyText = styled.p`
  color: #ff0000;
  font-size: 0.8rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;
const CancelButton = styled.button`
  width: 120px;
  border-top-right-radius: 0.5rem;
  padding: 1rem 0;
  border-bottom-right-radius: 0.5rem;
  background: ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textLightActiveColor};
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    filter: brightness(1.3);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
    width: 90px;
  }
`;

const OTP_LENGTH = 5;

export const MyAccountRightSection = () => {
  const customerData = useAppSelector(selectCustomer);
  const { t } = useTranslation('account');

  const [email, setEmail] = useState(customerData.email);
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(true);
  const [name, setName] = useState(customerData.name);
  const [isNameReadOnly, setIsNameReadOnly] = useState(true);
  const [phone, setPhone] = useState(`${customerData.country_code + '' + customerData.phone}`);
  const [countryCode, setCountryCode] = useState<number>(customerData.country_code || 49);
  const [otp, setOtp] = useState('');
  const [otpBig] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();

  const hanldeUpdateButtonClick = async () => {
    try {
      const response = await new NodeApiHttpPatchAccountProfileRequest(configuration, bearerToken as any).post({
        updating_values: {
          email,
          name,
        },
      });

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

      dispatch(updateCustomerName(name));
      dispatch(updateCustomerEmail(email));

      setIsEmailReadOnly(true);
      setIsNameReadOnly(true);

      dispatch(
        updateError({
          show: true,
          message: t('@update-success'),
          severity: 'success',
        }),
      );
    } catch (e) {
      console.error('e : ', e);
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    }
  };

  const handleVerifyEmailButtonClick = async () => {
    try {
      const response = await new NodeApiHttpPostVerifyEmailPhoneRequest(configuration, bearerToken as any).post({
        method: 'email',
        email,
      });

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

      setIsEmailReadOnly(true);
      setIsVerify(!isVerify);

      dispatch(
        updateError({
          show: true,
          message: 'Verification code sent t  o your email!',
          severity: 'success',
        }),
      );
    } catch (e) {
      console.error('e : ', e);
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await new NodeApiHttpPostVerifyCodeRequest(configuration, bearerToken as any).post({
        otp,
      });

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

      setIsEmailReadOnly(true);
      setIsVerify(false);
      dispatch(updateCustomerEmailVerification(1));

      dispatch(
        updateError({
          show: true,
          message: 'Wohoo 🎉 successfully verified!',
          severity: 'success',
        }),
      );
    } catch (e) {
      console.error('e : ', e);
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    }
  };

  useEffect(() => {
    // TODO: Call otp verification method automatically once entered
    if (otp.length === OTP_LENGTH) handleVerifyCode();
  }, [otp]);

  return (
    <Wrapper>
      <MobileBackButton path="/account" />

      <ContentContainer>
        <Content>
          <TitleContainer>
            <Title>{t('@name')}</Title>
            <IconContainer
              onClick={async () => {
                setIsNameReadOnly(!isNameReadOnly);
                if (!isNameReadOnly && customerData.name !== name) await hanldeUpdateButtonClick();
              }}
              readOnly={isNameReadOnly}
              title={t('@click-to-edit')}
            >
              <PencilIcon />
            </IconContainer>
          </TitleContainer>

          <TextContainer readOnly={isNameReadOnly}>
            <InputValue type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={isNameReadOnly} />
          </TextContainer>
        </Content>

        <Content>
          <TitleContainer>
            <TitleHeader>
              <Title>{t('@email')}</Title>
              <NotVerifyIndigator readOnly={isEmailReadOnly} isEmailVerify={!!customerData.email_verified}>
                <NotVerifyText>{t('@not-verified')}</NotVerifyText>
                <InfoRedIcon />
              </NotVerifyIndigator>
            </TitleHeader>

            <IconContainer
              onClick={async () => {
                setIsEmailReadOnly(!isEmailReadOnly);
                if (!isEmailReadOnly && customerData.email !== email) await hanldeUpdateButtonClick();
              }}
              readOnly={isEmailReadOnly}
              title="Click to Edit"
            >
              <PencilIcon />
            </IconContainer>
          </TitleContainer>

          <TextEmailContainer readOnly={isEmailReadOnly}>
            {!isVerify && (
              <>
                <EmailInputValue type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={isEmailReadOnly} />

                {!customerData.email_verified && (
                  <VerifyButton readOnly={isEmailReadOnly} onClick={handleVerifyEmailButtonClick}>
                    {t('@verify')}
                  </VerifyButton>
                )}
              </>
            )}

            {isVerify && !customerData.email_verified && (
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
                <CancelButton onClick={() => setIsVerify(!isVerify)}>{t('@Cancel')}</CancelButton>
              </InputContainer>
            )}
          </TextEmailContainer>
        </Content>

        <Content>
          <TitleContainer>
            <Title>{t('@phone')}</Title>
          </TitleContainer>

          <TextContainer readOnly={true}>
            <PhoneInput
              country={'de'}
              value={phone}
              enableSearch
              specialLabel=""
              disabled
              onChange={(ph, data) => {
                if ((data as any).dialCode !== countryCode) {
                  setCountryCode((data as any).dialCode);
                }
                setPhone(ph);
              }}
              inputStyle={{ border: 'none' }}
            />
          </TextContainer>
        </Content>
      </ContentContainer>
    </Wrapper>
  );
};

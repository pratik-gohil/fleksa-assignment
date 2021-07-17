import { useTranslation } from "next-i18next";
import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";

import styled from "styled-components";
import NodeApiHttpPostVerifyEmailPhoneRequest from "../../../../http/nodeapi/account/post.send-verify-code.nodeapi.http";
import NodeApiHttpPostVerifyCodeRequest from "../../../../http/nodeapi/account/post.verify-code.nodeapi.http";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { updateError } from "../../../../redux/slices/common.slices.redux";
import { selectConfiguration } from "../../../../redux/slices/configuration.slices.redux";
import { selectBearerToken, selectCustomer, updateCustomerEmail, updateCustomerEmailVerification, updateCustomerName } from "../../../../redux/slices/user.slices.redux";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";


export const StyledCheckoutCard = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  margin: ${props => props.theme.dimen.X4}px 0;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
`

export const StyledCheckoutTitle = styled.h3`
  margin: 0;
  padding-bottom: ${props => props.theme.dimen.X4}px;
`

export const StyledCheckoutInput = styled.input`
  flex: 2;
  max-width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
`

export const StyledCheckoutText = styled.p`
  display: flex;
  flex: 2 0 0;
  max-width: 100%;
  padding: ${props => props.theme.dimen.X4}px 0;
  margin: 0;
  word-wrap: break-word;
`

const InputContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  // margin: ;
  
`;

const Text = styled.p`
  flex: 1;
  min-width: 60px;
`

const EmailVerifyContainer = styled.div`
  display: flex;
  flex: 2;
  max-width: 100%;
  flex-direction: column;
`

const VerifyButton = styled.p`
  text-align: center;
  font-weight: 600;
  margin: 4px 0;
  cursor: pointer;
  background: ${props => props.theme.primaryColor};
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X}px ${props => props.theme.dimen.X4}px;
`

const OTP_LENGTH = 5;

const CheckoutPageCustomerInfo: FunctionComponent = ({}) => {
  const { t } = useTranslation('account');
  const userData = useAppSelector(selectCustomer)
  const bearerToken = useAppSelector(selectBearerToken)
  const configuration = useAppSelector(selectConfiguration)
  const [ otp, setOtp ] = useState("")
  const [ editableName, setEditableName ] = useState(!(userData.name && userData.name.length > 0))
  const [ editableEmail, setEditableEmail ] = useState(!(userData.email && userData.email.length > 0))
  const [ waitingForOtpVerifiction, setWaitingForOtpVerifiction ] = useState(false)
  const dispatch = useAppDispatch()


  const handleVerifyEmailButtonClick = async () => {
    try {
      if (!userData.email) return

      setWaitingForOtpVerifiction(true);

      const response = await new NodeApiHttpPostVerifyEmailPhoneRequest(configuration, bearerToken as any).post({
        method: 'email',
        email: userData.email,
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

      dispatch(
        updateError({
          show: true,
          message: t('@code-sent'),
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

      dispatch(updateCustomerEmailVerification(1));

      dispatch(
        updateError({
          show: true,
          message: t('@verify-success'),
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
    } finally {
      setOtp('');
      setWaitingForOtpVerifiction(false);
    }
  };

  useEffect(() => {
    if (otp.length === OTP_LENGTH) handleVerifyCode();
  }, [otp]);

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>How can we reach you?</StyledCheckoutTitle>
    <EditContainer>
      <Text>Name</Text>
      {editableName || !userData.name? (
        <EmailVerifyContainer>
          <StyledCheckoutInput
            type="text"
            placeholder="Name"
            value={userData.name}
            onBlur={() => setEditableName(!(userData.name && userData.name.length > 0))}
            onChange={e => dispatch(updateCustomerName(e.target.value))}
          />
        </EmailVerifyContainer>
      ): (
        <StyledCheckoutText>{userData.name}</StyledCheckoutText>
      )}
      <EditButton onClick={() => setEditableName(!editableName)} />
    </EditContainer>
    <EditContainer>
      <Text>Email</Text>
      {editableEmail || !userData.email_verified? <EmailVerifyContainer>{
        waitingForOtpVerifiction? <InputContainer>
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
            maxWidth: '200px',
            justifySelf: 'center',
            alignSelf: 'center',
          }}
          inputStyle={{
            fontFamily: 'Poppins',
            display: 'inline-block',
            fontSize: 30,
            padding: 0,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 4,
            color: '#222',
          }}
        />
      </InputContainer>: <>
        <StyledCheckoutInput
          type="text"
          placeholder="Email"
          value={userData.email || ""}
          onBlur={() => setEditableEmail(!(userData.email && userData.email.length > 0 && !userData.email_verified))}
          onChange={e => dispatch(updateCustomerEmail(e.target.value))}
        />
        <VerifyButton onClick={handleVerifyEmailButtonClick}>Verify</VerifyButton>
      </>
    }</EmailVerifyContainer>: (
        <StyledCheckoutText>{userData.email}</StyledCheckoutText>
      )}
      <EditButton onClick={() => setEditableEmail(!editableEmail)} />
    </EditContainer>
    <EditContainer>
      <Text>Phone</Text>
      <StyledCheckoutText>+{userData.country_code} {userData.phone}</StyledCheckoutText>
      <EditButton disabled={true} />
    </EditContainer>
  </StyledCheckoutCard>
}

export default CheckoutPageCustomerInfo

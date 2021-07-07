import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer, updateCustomerName, updateCustomerEmail } from '../../../../redux/slices/user.slices.redux';
import styled, { css } from 'styled-components';
import PencilIconPath from '../../../../public/assets/svg/pencil.svg';
import PhoneInput from 'react-phone-input-2';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import NodeApiHttpPatchAccountProfileRequest from '../../../../http/nodeapi/account/post.account.nodeapi.http';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { selectConfiguration } from '../../../../redux/slices/configuration.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';

const Wrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0.5rem 0 0 8rem;
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
`;

const TextContainer = styled.div<{ readOnly: boolean }>`
  margin: 1rem 0;
  cursor: ${(p) => (p.readOnly ? 'not-allowed' : 'none')};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
`;

const Button = css`
  padding: 0.8em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  border: none;
  color: white;
  border-radius: 10px;
  max-width: max-content;
  cursor: pointer;

  &:hover {
    filter: brightness(1.3);
  }
`;

const UpdateButton = styled.button`
  ${Button}
  background-color: ${(p) => p.theme.textDarkColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputValue = styled.input<{ readOnly: boolean }>`
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 0.5rem;

  padding: 1rem;
  width: 100%;
  font-size: 1.2rem;
  cursor: ${(p) => (p.readOnly ? 'not-allowed' : 'text')};

  &:hover,
  &:active,
  &:focus {
    border: ${(p) => (!p.readOnly ? `1px solid ${p.theme.textDarkActiveColor}` : '1px solid #dddddd')};
  }
`;

const TextEmailContainer = styled(TextContainer)`
  position: relative;
`;
const EmailInputValue = styled(InputValue)``;

const VerifyButton = styled.button`
  position: absolute;
  width: 120px;
  height: 100%;
  right: 0;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background: ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textLightActiveColor};
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    filter: brightness(1.3);
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

export const MyAccountRightSection = () => {
  const customerData = useAppSelector(selectCustomer);

  const [email, setEmail] = useState(customerData.email);
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(true);
  const [name, setName] = useState(customerData.name);
  const [isNameReadOnly, setIsNameReadOnly] = useState(true);
  const [phone, setPhone] = useState(`${customerData.country_code + '' + customerData.phone}`);
  const [countryCode, setCountryCode] = useState<number>(customerData.country_code || 49);
  const [loading, setLoading] = useState(false);

  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();

  const hanldeUpdateButtonClick = async () => {
    try {
      setLoading(true);

      const response = await new NodeApiHttpPatchAccountProfileRequest(configuration, bearerToken as any).post({
        updating_values: {
          email,
          name,
        },
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

      dispatch(updateCustomerName(name));
      dispatch(updateCustomerEmail(email));

      setIsEmailReadOnly(true);
      setIsNameReadOnly(true);

      dispatch(
        updateError({
          show: true,
          message: 'Updated successfully 🙌',
          severity: 'success',
        }),
      );
    } catch (e) {
      console.log('e : ', e);
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

  return (
    <Wrapper>
      <Content>
        <TitleContainer>
          <Title>Name</Title>
          <IconContainer onClick={() => setIsNameReadOnly(!isNameReadOnly)} readOnly={isNameReadOnly}>
            <PencilIcon />
          </IconContainer>
        </TitleContainer>

        <TextContainer readOnly={isNameReadOnly}>
          <InputValue type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={isNameReadOnly} />
        </TextContainer>
      </Content>

      <Content>
        <TitleContainer>
          <Title>Email</Title>

          <IconContainer onClick={() => setIsEmailReadOnly(!isEmailReadOnly)} readOnly={isEmailReadOnly}>
            <PencilIcon />
          </IconContainer>
        </TitleContainer>

        <TextEmailContainer readOnly={isEmailReadOnly}>
          <EmailInputValue type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={isEmailReadOnly} />

          {!customerData.email_verified && <VerifyButton>Verify</VerifyButton>}
        </TextEmailContainer>
      </Content>

      <Content>
        <TitleContainer>
          <Title>Phone Number</Title>
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
            inputStyle={{ width: '100%' }}
          />
        </TextContainer>
      </Content>

      <Content>
        <ButtonContainer>
          <UpdateButton onClick={hanldeUpdateButtonClick}>{loading ? <LoadingIndicator width={20} /> : 'Update'}</UpdateButton>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

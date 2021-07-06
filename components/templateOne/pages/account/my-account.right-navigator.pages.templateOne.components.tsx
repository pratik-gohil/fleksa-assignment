import React, { useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import styled, { css } from 'styled-components';
import PencilIconPath from '../../../../public/assets/svg/pencil.svg';
import PhoneInput from 'react-phone-input-2';

const Wrapper = styled.div`
  width: 70%;
  padding: 3rem 0;
  position: relative;

  ::before {
    content: '';
    width: 2rem;
    height: 100%;
    position: absolute;
    background: ${(p) => p.theme.primaryColor};
    top: 0;
    left: 0;
  }
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

const TextContainer = styled.div`
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
`;
const CancelButton = styled.button`
  ${Button}
  background-color: #DD0000
`;

const InputValue = styled.input`
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 0.5rem;

  padding: 1rem;
  width: 100%;
  font-size: 1.2rem;
  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${(p) => p.theme.textDarkActiveColor};
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

const IconContainer = styled.div`
  border-radius: 50%;
  width: 34px;
  height: 34px;
  border: 1px solid #dddddd;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const PencilIcon = styled(PencilIconPath)`
  font-size: 1.2rem;
  color: ${(p) => p.theme.textDarkColor};
`;

export const MyAccountRightSection = () => {
  const customerData = useAppSelector(selectCustomer);

  const [email, setEmail] = useState(customerData.email);
  const [name, setName] = useState(customerData.name);
  const [phone, setPhone] = useState(`${customerData.country_code + '' + customerData.phone}`);
  const [countryCode, setCountryCode] = useState<number>(customerData.country_code || 49);

  return (
    <Wrapper>
      <Content>
        <TitleContainer>
          <Title>Name</Title>
          <IconContainer>
            <PencilIcon />
          </IconContainer>
        </TitleContainer>
        <TextContainer>
          <InputValue type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </TextContainer>
      </Content>

      <Content>
        <TitleContainer>
          <Title>Email</Title>
          <IconContainer>
            <PencilIcon />
          </IconContainer>
        </TitleContainer>

        <TextEmailContainer>
          <EmailInputValue type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <VerifyButton>Verify</VerifyButton>
        </TextEmailContainer>
      </Content>

      <Content>
        <TitleContainer>
          <Title>Phone Number</Title>
        </TitleContainer>

        <TextContainer>
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
        </TextContainer>
      </Content>

      <Content>
        <ButtonContainer>
          <UpdateButton>Update</UpdateButton>
          <CancelButton> Cancel </CancelButton>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

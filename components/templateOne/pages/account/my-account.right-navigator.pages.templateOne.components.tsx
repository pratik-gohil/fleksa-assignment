import React, { useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import styled, { css } from 'styled-components';
import PencilIconPath from '../../../../public/assets/svg/pencil.svg';

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
`;

const TextContainer = styled.div`
  margin: 1rem 0;
`;

// const ChangeButtonContainer = styled.div``;

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
  background-color: ${(p) => p.theme.primaryColorRed};
`;

const InputValue = styled.input`
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 0.5rem;

  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 1.2rem;
`;

// const ChangeButton = styled.div`
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   display: grid;
//   place-items: center;
//   border: 1px solid rgba(0, 0, 0, 0.4);
//   cursor: pointer;

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.05);
//   }
// `;

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
        <TextContainer>
          <InputValue type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </TextContainer>
      </Content>

      <Content>
        <TitleContainer>
          <Title>Phone Number</Title>
        </TitleContainer>

        <TextContainer></TextContainer>
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

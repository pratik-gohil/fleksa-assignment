import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

const HomeIconPath = '/assets/svg/account/home.svg';
const WorkIconPath = '/assets/svg/account/work.svg';
const MapIconPath = '/assets/svg/account/map.svg';

const Wrapper = styled.div``;

const Header = styled.div`
  margin-top: 3rem;
  width: 100%;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: max-content;
  padding-top: 1rem;
`;

const InputBox = styled.div`
  padding: 0 0 1rem 0;
`;

const InputBoxFlex1 = styled.div`
  display: flex;

  input {
    &:nth-child(1) {
      width: 70%;
    }
    &:nth-child(2) {
      width: 30%;
      margin: 0 0 0 0.5rem;
    }
  }
`;

const InputBoxFlex2 = styled.div`
  display: flex;

  & > * {
    width: 50%;
  }

  div {
    &:nth-child(2) {
      margin: 0 0 0 0.5rem;
    }
  }
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

const TypeIcon = styled.img`
  height: 100%;
  width: 100%;
`;

const AddressTypeContainer = styled.div``;

const AddressType = styled.button<{ active: boolean }>`
  width: 70px;
  height: 70px;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(p) => (p.active ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)')};

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
`;

const SaveAddressButton = styled.button`
  margin-top: 1rem;
  background: ${(p) => p.theme.textDarkColor};
  width: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(p) => p.theme.textLightActiveColor};
  font-size: 1rem;

  &:hover {
    background: #575757;
  }
`;

interface IMyAccountAllAddressRightSideProps {
  handleShowNewAddressModal: () => void;
}

const MyAccountAllAddressRightSide: FunctionComponent<IMyAccountAllAddressRightSideProps> = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Add New Address</Title>
      </Header>

      <FormContainer>
        <InputBox>
          <Label>Street Address and Building number</Label>

          <InputBoxFlex1>
            <Input type="text" required={true} />
            <Input type="text" required={true} />
          </InputBoxFlex1>
        </InputBox>

        <InputBox>
          <Label>Details(Door, Apartment, Number)</Label>
          <Input type="text" required={true} />
        </InputBox>

        <InputBoxFlex2>
          <InputBox>
            <Label>City</Label>
            <Input type="text" required={true} />
          </InputBox>

          <InputBox>
            <Label>Postal Code</Label>
            <Input type="text" required={true} />
          </InputBox>
        </InputBoxFlex2>

        <AddressTypeContainer>
          <Label>Address Type</Label>

          <IconContainer>
            <AddressType active={true}>
              <TypeIcon src={HomeIconPath} />
            </AddressType>
            <AddressType active={false}>
              <TypeIcon src={WorkIconPath} />
            </AddressType>
            <AddressType active={false}>
              <TypeIcon src={MapIconPath} />
            </AddressType>
          </IconContainer>
        </AddressTypeContainer>

        <SaveAddressButton type="submit">Save Address</SaveAddressButton>
      </FormContainer>
    </Wrapper>
  );
};

export default MyAccountAllAddressRightSide;

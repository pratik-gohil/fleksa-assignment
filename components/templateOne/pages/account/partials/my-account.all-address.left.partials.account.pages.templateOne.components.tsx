import React from 'react';
import styled from 'styled-components';

import EditIconPath from '../../../../../public/assets/svg/pencil.svg';
import PlusIconPath from '../../../../../public/assets/svg/account/plus.svg';
import { useAppSelector } from '../../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../../redux/slices/user.slices.redux';

const HomeIconPath = '/assets/svg/account/home.svg';
const WorkIconPath = '/assets/svg/account/work.svg';
const MapIconPath = '/assets/svg/account/map.svg';

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 400px;
`;

const Header = styled.div`
  margin-top: 3rem;
  width: 100%;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
`;

const AddressContainer = styled.div`
  width: 100%;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

const Content = styled.div`
  padding: 0 0.5rem;
  width: 75%;
`;

const Label = styled.h3`
  padding: 0;
  margin: 0;
`;
const Value = styled.p`
  padding: 0;
  margin: 0;

  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
`;

const TypeIcon = styled.img`
  height: 100%;
  width: 100%;
`;

const EditIcon = styled(EditIconPath)``;
const PlusIcon = styled(PlusIconPath)``;

const EditButton = styled.button`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  border: 1px solid #dddddd;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: #fff;

  &:hover {
    background: #eeecec;
  }
`;

const AddNewAddressButton = styled.button`
  background: ${(p) => p.theme.textDarkColor};
  width: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #575757;
  }
`;

const Text = styled.span`
  color: ${(p) => p.theme.textLightActiveColor};
  font-size: 1rem;
  padding: 0 1rem;
`;

const MyAccountAllAddressLeftSide = () => {
  const addressess = useAppSelector(selectCustomer).all_address;

  return (
    <Wrapper>
      <Header>
        <Title>My Addresses</Title>
      </Header>

      <Container>
        <AddressContainer>
          {addressess?.map((address) => (
            <Address>
              <IconContainer>
                {address.address_type === 'HOME' && <TypeIcon src={HomeIconPath} />}
                {address.address_type === 'WORK' && <TypeIcon src={WorkIconPath} />}
                {address.address_type === 'OTHER' && <TypeIcon src={MapIconPath} />}
              </IconContainer>

              <Content>
                <Label>{address.address_type}</Label>
                <Value>
                  {address.address},{address.city}
                </Value>
              </Content>

              <EditButton>
                <EditIcon />
              </EditButton>
            </Address>
          ))}
        </AddressContainer>

        <AddNewAddressButton>
          <PlusIcon />

          <Text>New Address</Text>
        </AddNewAddressButton>
      </Container>
    </Wrapper>
  );
};

export default MyAccountAllAddressLeftSide;

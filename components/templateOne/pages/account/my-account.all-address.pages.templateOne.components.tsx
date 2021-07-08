import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import EditIconPath from '../../../../public/assets/svg/pencil.svg';
import PlusIconPath from '../../../../public/assets/svg/account/plus.svg';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';

const HomeIconPath = '/assets/svg/account/home.svg';
const WorkIconPath = '/assets/svg/account/work.svg';
// const MapIconPath = '/assets/svg/account/map.svg';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  display: flex;
  flex-direction: column;
  margin: auto 4rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  min-height: 400px;
`;

const Header = styled.div`
  margin-top: 3rem;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
`;

const AddressContainer = styled.div``;

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

const HomeIcon = styled.img`
  height: 100%;
  width: 100%;
`;
const WorkIcon = styled.img`
  height: 100%;
  width: 100%;
`;
// const MapIcon = styled.img`
//   height: 100%;
//   width: 100%;
// `;
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

const AccountPageAllAddress: FunctionComponent = ({}) => {
  const order = useAppSelector(selectCustomer);

  return (
    <Wrapper>
      <Header>
        <Title>My Addresses</Title>
      </Header>

      <Container>
        <AddressContainer>
          <Address>
            <IconContainer>
              <HomeIcon src={HomeIconPath} />
            </IconContainer>

            <Content>
              <Label>OTHER</Label>
              <Value>Bieberer Straße , Mühlheim am Main </Value>
            </Content>

            <EditButton>
              <EditIcon />
            </EditButton>
          </Address>

          <Address>
            <IconContainer>
              <WorkIcon src={WorkIconPath} />
            </IconContainer>

            <Content>
              <Label>OTHER</Label>
              <Value>Bieberer Straße , Mühlheim am Main </Value>
            </Content>

            <EditButton>
              <EditIcon />
            </EditButton>
          </Address>
        </AddressContainer>

        <AddNewAddressButton>
          <PlusIcon />

          <Text>New Address</Text>
        </AddNewAddressButton>
      </Container>
    </Wrapper>
  );
};

export default AccountPageAllAddress;

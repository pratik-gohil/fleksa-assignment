import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import EditIconPath from '../../../../../public/assets/svg/pencil.svg';
import PlusIconPath from '../../../../../public/assets/svg/account/plus.svg';
import { useAppSelector } from '../../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../../redux/slices/user.slices.redux';
import { IParticularAddress } from '../../../../../interfaces/common/customer.common.interfaces';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';

const HomeIconPath = '/assets/svg/account/home.svg';
const WorkIconPath = '/assets/svg/account/work.svg';
const MapIconPath = '/assets/svg/account/map.svg';

const Wrapper = styled.div`
  margin-left: 5rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-left: 0;
    min-height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
    width: 100%;
  }
`;

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
  margin: 0;
  padding: 0 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1.5rem;
    padding: 0;
    text-align: center;
  }
`;

const AddressContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-x: hidden;
  padding: 0 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0;
  }
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

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
  }
`;
const Value = styled.p`
  padding: 0;
  margin: 0;

  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 24px;
    height: 24px;
  }
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

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 34px;
    height: 34px;
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

interface IMyAccountAllAddressLeftSideProps {
  handleShowNewAddressModal: (isEdit: boolean) => void;
  handleChangeEditMode: () => void;
  show: boolean;
  handleSetExistAddress: (address: IParticularAddress) => void;
}

const MyAccountAllAddressLeftSide: FunctionComponent<IMyAccountAllAddressLeftSideProps> = ({
  handleShowNewAddressModal,
  show,
  handleChangeEditMode,
  handleSetExistAddress,
}) => {
  const addressess = useAppSelector(selectCustomer).all_address;

  const handleUpdateAddressButton = async (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>, address: IParticularAddress) => {
    // TODO: Open up the modal
    handleShowNewAddressModal(true);

    // TODO: Change Address modal into Edit mode
    handleChangeEditMode();

    // TODO: Set exist address
    handleSetExistAddress(address);
  };

  return (
    <Wrapper>
      <Header>
        <Title>My Addresses</Title>
      </Header>

      <Container>
        <AddressContainer>
          {addressess?.map((address) => (
            <Address key={address.id}>
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

              <EditButton onClick={async (e) => await handleUpdateAddressButton(e, address)}>
                <EditIcon />
              </EditButton>
            </Address>
          ))}
        </AddressContainer>

        {!show && (
          <AddNewAddressButton onClick={() => handleShowNewAddressModal(false)}>
            <PlusIcon />

            <Text>New Address</Text>
          </AddNewAddressButton>
        )}
      </Container>
    </Wrapper>
  );
};

export default MyAccountAllAddressLeftSide;

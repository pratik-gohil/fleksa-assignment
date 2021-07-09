import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import EditIconPath from '../../../../../public/assets/svg/pencil.svg';
import PlusIconPath from '../../../../../public/assets/svg/account/plus.svg';
// import DeleteIconPath from '../../../../../public/assets/svg/account/delete.svg';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks.redux';
import { selectBearerToken, selectCustomer } from '../../../../../redux/slices/user.slices.redux';
import { IParticularAddress } from '../../../../../interfaces/common/customer.common.interfaces';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';
import NodeApiHttpPostDeleteAddressRequest from '../../../../../http/nodeapi/account/post.delete-address.nodeapi.http';
import { selectConfiguration } from '../../../../../redux/slices/configuration.slices.redux';
import { updateError } from '../../../../../redux/slices/common.slices.redux';
import { deleteCustomerAddress } from '../../../../../redux/slices/user.slices.redux';

const HomeIconPath = '/assets/svg/account/home.svg';
const WorkIconPath = '/assets/svg/account/work.svg';
const MapIconPath = '/assets/svg/account/map.svg';
const DeleteIconPath = '/assets/svg/account/delete.svg';

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
  /* min-height: 400px; */

  @media (max-width: ${BREAKPOINTS.sm}px) {
    /* min-height: 450px; */
  }
`;

const Header = styled.div`
  margin-top: 3rem;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-top: 1rem;
  }
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

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 50%;
  }
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

const OptionIconContainer = styled.div`
  display: flex;
`;
const EditIcon = styled(EditIconPath)``;
const DeleteIcon = styled.img`
  width: 100%;
  height: 100%;
`;
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
  margin-left: 0.5rem;

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
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();

  const handleUpdateAddressButton = async (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>, address: IParticularAddress) => {
    // TODO: Open up the modal
    handleShowNewAddressModal(true);

    // TODO: Change Address modal into Edit mode
    handleChangeEditMode();

    // TODO: Set exist address
    handleSetExistAddress(address);
  };

  const handleDeleteAddressButton = async (_e: any, id: number) => {
    if (!confirm('Are you sure ?')) return;

    try {
      const response = await new NodeApiHttpPostDeleteAddressRequest(configuration, bearerToken as any).post({
        customer_address_id: id,
        updating_values: {
          is_active: false,
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

      dispatch(
        updateError({
          show: true,
          message: 'Removed Successfully!',
          severity: 'success',
        }),
      );

      dispatch(deleteCustomerAddress(id));
    } catch (e) {
      console.log('error : ', e);
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

              <OptionIconContainer>
                <EditButton onClick={async (e) => await handleUpdateAddressButton(e, address)}>
                  <EditIcon />
                </EditButton>
                <EditButton onClick={async (e) => await handleDeleteAddressButton(e, address.id)}>
                  <DeleteIcon src={DeleteIconPath} />
                </EditButton>
              </OptionIconContainer>
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

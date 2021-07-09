import React, { FormEvent, FunctionComponent } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import NodeApiHttpPostCreateNewAddressRequest from '../../../../../http/nodeapi/account/post.create-address.nodeapi.http';
import LoadingIndicator from '../../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import { Allowed_address_type } from '../../../../../interfaces/http/nodeapi/account/post.create-address.nodeapi.http';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks.redux';
import { selectConfiguration } from '../../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken, updateNewCustomerAddress } from '../../../../../redux/slices/user.slices.redux';
import { updateError } from '../../../../../redux/slices/common.slices.redux';
import { IParticularAddress } from '../../../../../interfaces/common/customer.common.interfaces';
import NodeApiHttpPostUpdateAddressRequest from '../../../../../http/nodeapi/account/post.update-address.nodeapi.http';
import { useEffect } from 'react';

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

const FormContainer = styled.form`
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
  handleShowNewAddressModal: (isEdit: boolean) => void;
  existAddress: IParticularAddress | null;
  isEditMode: boolean;
}

const MyAccountAllAddressRightSide: FunctionComponent<IMyAccountAllAddressRightSideProps> = ({
  handleShowNewAddressModal,
  existAddress,
  isEditMode,
}) => {
  const [address, setAddress] = useState('');
  const [floor, setFloor] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [type, setType] = useState('HOME'); // ? default
  const [proximity, setProximity] = useState('');
  const [loading, setLoading] = useState(false);

  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const dispatch = useAppDispatch();

  const handleCreateNewAddressFormRequest = async (e: FormEvent) => {
    e.preventDefault();

    if (isEditMode) await updateAddressRequest();
    else await addNewAddressRequest();
  };

  // TODO: For creating a new address
  async function addNewAddressRequest() {
    try {
      setLoading(true);

      const response = await new NodeApiHttpPostCreateNewAddressRequest(configuration, bearerToken as any).post({
        address,
        floor,
        city,
        postal_code: postalCode,
        address_type: type as Allowed_address_type,
        proximity,
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

      dispatch(
        updateError({
          show: true,
          message: 'Wohoo 🎉 Successfully added!',
          severity: 'success',
        }),
      );

      // TODO: Update the local state
      dispatch(updateNewCustomerAddress(response?.data?.address));
    } catch (e) {
      console.log('error : ', e);
      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: 'Ooops! Something went wrong.',
          severity: 'error',
        }),
      );
    }

    // TODO: clear the input
    setAddress('');
    setFloor('');
    setCity('');
    setPostalCode('');
    setType('');
    setType('HOME');
    setProximity('');

    // TODO: Close the modal
    handleShowNewAddressModal(false);
  }

  // TODO: For Updating a existing address
  async function updateAddressRequest() {
    if (!existAddress) return;

    try {
      setLoading(true);

      const response = await new NodeApiHttpPostUpdateAddressRequest(configuration, bearerToken as any).post({
        customer_address_id: existAddress.id,
        updating_values: {
          city,
          postal_code: postalCode,
          address,
          floor,
          area: proximity,
          address_type: type,
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
          message: 'Updated Successfully!',
          severity: 'success',
        }),
      );
    } catch (e) {
      console.log('error : ', e);
      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: 'Ooops! Something went wrong.',
          severity: 'error',
        }),
      );
    }
  }

  useEffect(() => {
    if (!isEditMode && !existAddress) return;

    // TODO: Update the input by exist values
    setAddress(existAddress?.address || '');
    setFloor(existAddress?.floor || '');
    setCity(existAddress?.city || '');
    setPostalCode(existAddress?.postal_code || '');
    setType(existAddress?.address_type || '');
    setProximity(existAddress?.area || '');
  }, [isEditMode]);

  return (
    <Wrapper>
      <Header>
        <Title>Add New Address</Title>
      </Header>

      <FormContainer onSubmit={handleCreateNewAddressFormRequest}>
        <InputBox>
          <Label>Street Address and Building number</Label>

          <InputBoxFlex1>
            <Input type="text" required={true} value={address} onChange={(e) => setAddress(e.target.value)} />
            <Input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} />
          </InputBoxFlex1>
        </InputBox>

        <InputBox>
          <Label>Details(Door, Apartment, Number)</Label>
          <Input type="text" value={proximity} onChange={(e) => setProximity(e.target.value)} />
        </InputBox>

        <InputBoxFlex2>
          <InputBox>
            <Label>City</Label>
            <Input type="text" required={true} value={city} onChange={(e) => setCity(e.target.value)} />
          </InputBox>

          <InputBox>
            <Label>Postal Code</Label>
            <Input type="text" required={true} value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </InputBox>
        </InputBoxFlex2>

        <AddressTypeContainer>
          <Label>Address Type</Label>

          <IconContainer>
            <AddressType type="button" active={type === 'HOME'} onClick={() => setType('HOME')}>
              <TypeIcon src={HomeIconPath} />
            </AddressType>
            <AddressType type="button" active={type === 'WORK'} onClick={() => setType('WORK')}>
              <TypeIcon src={WorkIconPath} />
            </AddressType>
            <AddressType type="button" active={type === 'OTHER'} onClick={() => setType('OTHER')}>
              <TypeIcon src={MapIconPath} />
            </AddressType>
          </IconContainer>
        </AddressTypeContainer>

        <SaveAddressButton type="submit">
          {loading ? <LoadingIndicator width={20} /> : isEditMode ? 'Update Address' : 'Save Address'}
        </SaveAddressButton>
      </FormContainer>
    </Wrapper>
  );
};

export default MyAccountAllAddressRightSide;

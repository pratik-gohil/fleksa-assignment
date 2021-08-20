import React, { FormEvent, FunctionComponent, useRef } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import NodeApiHttpPostCreateNewAddressRequest from '../../../../../http/nodeapi/account/post.create-address.nodeapi.http';
import LoadingIndicator from '../../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import { Allowed_address_type } from '../../../../../interfaces/http/nodeapi/account/post.create-address.nodeapi.http';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks.redux';
import { selectConfiguration } from '../../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken, updateExistCustomerAddress, updateNewCustomerAddress } from '../../../../../redux/slices/user.slices.redux';
import { updateError } from '../../../../../redux/slices/common.slices.redux';
import { IParticularAddress } from '../../../../../interfaces/common/customer.common.interfaces';
import NodeApiHttpPostUpdateAddressRequest from '../../../../../http/nodeapi/account/post.update-address.nodeapi.http';
import { useEffect } from 'react';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';
import { useTranslation } from 'next-i18next';
import HomeIconPath from '../../../../../public/assets/svg/address/home.svg';
import WorkIconPath from '../../../../../public/assets/svg/address/work.svg';
import MapIconPath from '../../../../../public/assets/svg/address/map.svg';
import SvgCross from '../../../../../public/assets/svg/cross.svg';
import { amplitudeEvent, constructEventName } from '../../../../../utils/amplitude.util';
import { AddressTypes } from '../../../common/addresses/address-manager.common.templateOne.components';

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1.3rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: max-content;
`;

const InputBox = styled.div`
  padding: 0 0 1rem 0;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-bottom: 0.5rem;
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
  text-transform: uppercase;
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

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
`;

const Input = styled.input`
  ${BaseInputStyle}

  transition: border 0.2s linear;

  &::placeholder {
    font-weight: 300;
    text-transform: uppercase;
    font-size: 0.8rem;
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

const AddressTypeContainer = styled.div``;

const AddressType = styled.button<{ active: boolean }>`
  width: 100px;
  height: 100px;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(p) => (p.active ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)')};

  &:hover {
    background: rgba(0, 0, 0, 1);

    svg {
      fill: #fff;
    }
    p {
      color: #fff;
    }
  }

  svg {
    fill: ${(p) => (p.active ? '#fff' : '#000')};
    width: 48px;
    height: 48px;
  }

  p {
    color: ${(p) => (p.active ? '#fff' : '#000')};
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 70px;
    height: 70px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const IconLabel = styled.p`
  padding: 0.3rem 0;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0.2rem 0;
    font-size: 0.6rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    justify-content: center;
  }
`;

const SaveAddressButton = styled.button`
  margin-top: 1rem;
  background: ${(p) => p.theme.textDarkColor};
  width: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(p) => p.theme.textLightActiveColor};
  font-size: 1rem;

  &:hover {
    background: #575757;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    /* padding: 0.5rem; */
  }
`;

const CloseButton = styled.div`
  padding: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;

  svg {
    display: block;
    width: 16px;
    height: 16px;
    fill: #222;
  }
`;

const HomeIcon = styled(HomeIconPath)``;
const WorkIcon = styled(WorkIconPath)``;
const MapIcon = styled(MapIconPath)``;

interface IMyAccountAllAddressRightSideProps {
  handleShowNewAddressModal: (isEdit: boolean) => void;
  existAddress: IParticularAddress | null;
  isEditMode: boolean;
}

let autoComplete: google.maps.places.Autocomplete;

const MyAccountAllAddressRightSide: FunctionComponent<IMyAccountAllAddressRightSideProps> = ({
  handleShowNewAddressModal,
  existAddress,
  isEditMode,
}) => {
  const [address, setAddress] = useState('');
  const [floor, setFloor] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [type, setType] = useState('HOME'); // ? default
  const [proximity, setProximity] = useState('');
  const [loading, setLoading] = useState(false);
  const refAddressInput = useRef<HTMLInputElement>(null);

  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const { t } = useTranslation('account');
  const dispatch = useAppDispatch();

  // TODO: Auto complete
  function onAddressChange() {
    console.log('changed address');
    const place = autoComplete.getPlace();
    if (place.address_components) {
      for (let component of place.address_components) {
        if (component.types[0] === 'route') {
          let temp = '';
          for (let component2 of place.address_components) if (component2.types[0] === 'street_number') temp = component2.short_name;
          setAddress(`${component.long_name} ${temp}`);
          // setAddressStreet(component.long_name);
        } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1)
          setArea(component.long_name.includes('Innenstadt') ? 'Innenstadt' : component.long_name);
        else if (component.types[0] === 'locality') setCity(component.long_name);
        else if (component.types[0] === 'postal_code') setPostalCode(component.short_name);
      }
    }
  }

  useEffect(() => {
    if (window !== 'undefined' && refAddressInput.current) {
      autoComplete = new google.maps.places.Autocomplete(refAddressInput.current, {
        types: ['geocode'],
      });
      autoComplete.setFields(['address_component']);
      autoComplete.addListener('place_changed', onAddressChange);
    }
  }, [refAddressInput]);

  const handleCreateNewAddressFormRequest = async (e: FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      amplitudeEvent(constructEventName(`update address`, 'button'), {});
      await updateAddressRequest();
    } else {
      amplitudeEvent(constructEventName(`save address`, 'button'), {});
      await addNewAddressRequest();
    }

    // TODO: Close modal
    handleShowNewAddressModal(false);

    await clearLocalState(); // ? Clear the local state
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
        area,
      });

      setLoading(false);

      if (!response.result) {
        amplitudeEvent(constructEventName(`new address error`, 'response'), response);

        dispatch(
          updateError({
            show: true,
            message: response.message,
            severity: 'error',
          }),
        );
        return;
      }

      amplitudeEvent(constructEventName(`new address success`, 'response'), response);

      dispatch(
        updateError({
          show: true,
          message: t('@add-success'),
          severity: 'success',
        }),
      );

      // TODO: Update the local state
      dispatch(updateNewCustomerAddress(response?.data?.address));
    } catch (e) {
      amplitudeEvent(constructEventName(`new address error catch`, 'error'), { error: e });

      console.error('error : ', e);
      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    }
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

      setLoading(false);

      if (!response.result) {
        amplitudeEvent(constructEventName(`update address error`, 'response'), response);

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
          message: t('@update-success'),
          severity: 'success',
        }),
      );

      amplitudeEvent(constructEventName(`update address success`, 'response'), response);

      dispatch(
        updateExistCustomerAddress({
          ...existAddress,
          address,
          city,
          area: proximity,
          postal_code: postalCode,
          address_type: type,
          floor,
        }),
      );
    } catch (e) {
      console.error('error : ', e);
      amplitudeEvent(constructEventName(`update address error catch`, 'error'), { error: e });

      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: t('@oops-error'),
          severity: 'error',
        }),
      );
    }
  }

  // * For reset and fill up input fields
  useEffect(() => {
    if (isEditMode) {
      // TODO: Update the input by exist values
      setAddress(existAddress?.address || '');
      setFloor(existAddress?.floor || '');
      setCity(existAddress?.city || '');
      setPostalCode(existAddress?.postal_code || '');
      setType(existAddress?.address_type || '');
      setProximity(existAddress?.area || '');
    }
    // TODO: clear the input
    else clearLocalState();
  }, [isEditMode]);

  async function clearLocalState() {
    // TODO: clear the input
    setAddress('');
    setFloor('');
    setCity('');
    setPostalCode('');
    setType('');
    setType('HOME');
    setProximity('');
  }

  function handleAddressTypeSelectionClick(_e: any, title: AddressTypes) {
    setType(title);

    amplitudeEvent(constructEventName(`address-model-${title}`, 'button'), {});
  }

  return (
    <Wrapper>
      <Header>
        <Title>{isEditMode ? t('@update-your-address') : t('@add-your-address')}</Title>
        <CloseButton
          onClick={() => {
            amplitudeEvent(constructEventName(`address-model-close`, 'icon-button'), {});

            handleShowNewAddressModal(false);
          }}
        >
          <SvgCross />
        </CloseButton>
      </Header>

      <FormContainer onSubmit={handleCreateNewAddressFormRequest}>
        <InputBox>
          <Label>{t('@street')}</Label>

          <Input
            type="text"
            required={true}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t('@street')}
            ref={refAddressInput}
            onBlur={() =>
              amplitudeEvent(constructEventName(`address-model-${t('@street')}`, 'input'), {
                address,
                length: address.length,
              })
            }
          />
        </InputBox>

        <InputBox>
          <Label>{t('@details')}</Label>
          <Input
            type="text"
            value={proximity}
            onChange={(e) => setProximity(e.target.value)}
            placeholder={t('@details')}
            onBlur={() =>
              amplitudeEvent(constructEventName(`address-model-${t('@details')}`, 'input'), {
                proximity,
                length: proximity.length,
              })
            }
          />
        </InputBox>

        <InputBoxFlex2>
          <InputBox>
            <Label>{t('@city')}</Label>
            <Input
              type="text"
              required={true}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t('@city')}
              onBlur={() =>
                amplitudeEvent(constructEventName(`address-model-${t('@city')}`, 'input'), {
                  city,
                  length: city.length,
                })
              }
            />
          </InputBox>

          <InputBox>
            <Label>{t('@postal-code')}</Label>
            <Input
              type="text"
              required={true}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={t('@postal-code')}
              onBlur={() =>
                amplitudeEvent(constructEventName(`address-model-${t('@postal-code')}`, 'input'), {
                  postalCode,
                  length: postalCode.length,
                })
              }
            />
          </InputBox>
        </InputBoxFlex2>

        <AddressTypeContainer>
          <Label>{t('@address-type')}</Label>

          <IconContainer>
            <AddressType type="button" active={type === 'HOME'} onClick={(e) => handleAddressTypeSelectionClick(e, 'HOME')}>
              <HomeIcon />
              <IconLabel>HOME</IconLabel>
            </AddressType>
            <AddressType type="button" active={type === 'WORK'} onClick={(e) => handleAddressTypeSelectionClick(e, 'WORK')}>
              <WorkIcon />
              <IconLabel>WORK</IconLabel>
            </AddressType>
            <AddressType type="button" active={type === 'OTHER'} onClick={(e) => handleAddressTypeSelectionClick(e, 'OTHER')}>
              <MapIcon />
              <IconLabel>OTHER</IconLabel>
            </AddressType>
          </IconContainer>
        </AddressTypeContainer>

        <SaveAddressButton type="submit">
          {loading ? <LoadingIndicator width={20} /> : isEditMode ? t('@update-address') : t('@save-address')}
        </SaveAddressButton>
      </FormContainer>
    </Wrapper>
  );
};

export default MyAccountAllAddressRightSide;

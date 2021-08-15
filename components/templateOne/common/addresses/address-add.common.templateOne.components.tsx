import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import PyApiHttpPostAddress from '../../../../http/pyapi/address/post.address.pyapi.http';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectConfiguration, selectLanguageCode, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import {
  selectAddressByType,
  selectBearerToken,
  selectIsUserLoggedIn,
  updateExistCustomerAddressOrAddNew,
} from '../../../../redux/slices/user.slices.redux';
import { AddressTypes } from './address-manager.common.templateOne.components';
import { LS_GUEST_USER_ADDRESS } from '../../../../constants/keys-local-storage.constants';
import { updateDeliveryFinances, updateSelectedAddressId } from '../../../../redux/slices/checkout.slices.redux';
import { updateShowAddAddress, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';

import SvgHome from '../../../../public/assets/svg/address/home.svg';
import SvgWork from '../../../../public/assets/svg/address/work.svg';
import SvgMap from '../../../../public/assets/svg/address/map.svg';
import SvgCross from '../../../../public/assets/svg/cross.svg';
import SvgAutolocate from '../../../../public/assets/svg/autolocate.svg';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';

export interface IGuestAddress {
  floor: string;
  address: string;
  address_type: AddressTypes;
  city: string;
  postal_code: string;
}

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: ${(props) => props.theme.navMobile.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.dimen.X4}px;
  z-index: 1;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: ${(props) => props.theme.navDesktop.height}px;
    bottom: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 500px;
  max-height: 90%;
  background-color: #fff;
  overflow: auto;
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 0 0 ${(props) => props.theme.dimen.X4}px 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => props.theme.border};
  margin: 0 0 ${(props) => props.theme.dimen.X4}px 0;
  padding: 0 ${(props) => props.theme.dimen.X4}px;
`;

const Title = styled.h3`
  margin: 0;
  line-height: 1;
`;

const CloseButton = styled.div`
  padding: 16px;
  cursor: pointer;
  svg {
    display: block;
    width: 16px;
    height: 16px;
    fill: #222;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin: 0 ${(props) => props.theme.dimen.X4}px;
`;

const InputItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${(props) => props.theme.dimen.X4}px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  font-family: inherit;
`;

const InputSubmit = styled(Input)`
  font-weight: 700;
  cursor: pointer;
  background: #333;
  color: #fff;
  margin: ${(props) => props.theme.dimen.X4}px;
`;

const Error = styled.p`
  font-size: 12px;
  color: #f44336;
  margin: 0 ${(props) => props.theme.dimen.X4}px;
`;

const AddressTypeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${(props) => props.theme.dimen.X4}px;
  label {
    padding: 0 ${(props) => props.theme.dimen.X4}px;
  }
`;

const AddressTypeItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const AddressTypeItem = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  margin: ${(props) => props.theme.dimen.X4}px;
  padding: ${(props) => props.theme.dimen.X4}px 0;
  border-radius: ${(props) => props.theme.borderRadius}px;
  background: ${(props) => (props.active ? '#222' : '#fff')};
  svg {
    fill: ${(props) => (props.active ? '#fff' : '#222')};
    width: 48px;
    height: 48px;
  }
  p {
    color: ${(props) => (props.active ? '#fff' : '#222')};
    margin: 0;
    padding-top: 6px;
  }
`;

const AddressTypeName = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const InputWithAutoLocate = styled.div`
  position: relative;
`;

const Autolocate = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 46px;
  height: 46px;
  padding: 12px;
`;

let autoComplete: google.maps.places.Autocomplete;

const AddressAdd: FunctionComponent = () => {
  const { t } = useTranslation('add-address');
  const dispatch = useAppDispatch();
  const shopId = useAppSelector(selectSelectedMenu);
  const refAddressInput = useRef<HTMLInputElement>(null);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const bearerToken = useAppSelector(selectBearerToken);
  const languageCode = useAppSelector(selectLanguageCode);
  const configuration = useAppSelector(selectConfiguration);
  const [addressType, setAddressType] = useState<AddressTypes>('HOME');
  const addressByType = useAppSelector((state) => selectAddressByType(state, addressType));

  const [errorMessage, setErrorMessage] = useState<string>();

  const [addressMain, setAddressMain] = useState('');
  const [_, setAddressStreet] = useState('');
  const [addressArea, setAddressArea] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressPostalCode, setAddressPostalCode] = useState('');
  const [addressFloor, setAddressFloor] = useState('');

  // useEffect(() => {
  //   dispatch(updateShowAddAddress(true));
  // }, []);

  function onAddressChange(placeReceived?: google.maps.places.PlaceResult) {
    resetAddressData();
    const place = placeReceived || autoComplete.getPlace();
    if (place.address_components) {
      for (let component of place.address_components) {
        if (component.types[0] === 'route') {
          let temp = '';
          for (let component2 of place.address_components) if (component2.types[0] === 'street_number') temp = component2.short_name;
          setAddressMain(`${component.long_name} ${temp}`);
          setAddressStreet(component.long_name);
        } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1)
          setAddressArea(component.long_name.includes('Innenstadt') ? 'Innenstadt' : component.long_name);
        else if (component.types[0] === 'locality') setAddressCity(component.long_name);
        else if (component.types[0] === 'postal_code') setAddressPostalCode(component.short_name);
      }
    }
  }

  async function geocodeLatLng(location: { lat: number; lng: number }) {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location }, null);

    const place = response.results[0];
    if (place) {
      onAddressChange(place);
    }
  }

  function updateCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      geocodeLatLng(pos);
    });
  }

  useEffect(() => {
    setErrorMessage(undefined);
    if (isLoggedIn) {
      if (addressByType) {
        setAddressMain(addressByType.address || '');
        setAddressCity(addressByType.city);
        setAddressArea(addressByType.area || '');
        setAddressFloor(addressByType.floor || '');
        setAddressPostalCode(addressByType.postal_code);
      } else {
        resetAddressData();
      }
    }
  }, [addressByType]);

  function resetAddressData() {
    setAddressMain('');
    setAddressCity('');
    setAddressArea('');
    setAddressFloor('');
    setAddressPostalCode('');
  }

  useEffect(() => {
    setErrorMessage(undefined);
    if (!isLoggedIn) {
      const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS);
      if (guestAddressString) {
        const guestAddress = JSON.parse(guestAddressString) as IGuestAddress;
        if (guestAddress.address_type === addressType) {
          setAddressFloor(guestAddress.floor);
          setAddressMain(guestAddress.address);
          setAddressCity(guestAddress.city);
          setAddressPostalCode(guestAddress.postal_code);
        } else {
          setAddressFloor('');
          setAddressMain('');
          setAddressCity('');
          setAddressPostalCode('');
        }
      }
    }
  }, [addressType]);

  useEffect(() => {
    if (window !== 'undefined' && refAddressInput.current) {
      autoComplete = new google.maps.places.Autocomplete(refAddressInput.current, {
        types: ['geocode'],
      });
      autoComplete.setFields(['address_component']);
      autoComplete.addListener('place_changed', onAddressChange);
    }
  }, [refAddressInput]);

  async function onClickSubmit() {
    setErrorMessage(undefined);
    if (shopId) {
      const response = await new PyApiHttpPostAddress(configuration).postAll({
        area: addressArea,
        city: addressCity,
        floor: addressFloor,
        address: addressMain,
        addressType: addressType,
        shopId,
        postalCode: addressPostalCode,
        token: bearerToken,
      });

      console.log(response);

      if (response?.result && response.possibilities[shopId].is_available) {
        dispatch(updateDeliveryFinances(response.possibilities[shopId].details));

        if (isLoggedIn && bearerToken && response.customer.details) {
          const addressData: IParticularAddress = {
            id: response.customer.details?.customer_address_id,
            address_type: addressType,
            floor: addressFloor,
            address: addressMain,
            country: '',
            postal_code: addressPostalCode,
            city: addressCity,
            state: '',
          };
          dispatch(updateExistCustomerAddressOrAddNew(addressData));
          dispatch(updateSelectedAddressId(response.customer.details?.customer_address_id));
          dispatch(updateShowAddAddress(false));
        } else {
          const guestAddress: IGuestAddress = {
            floor: addressFloor,
            address: addressMain,
            address_type: addressType,
            city: addressCity,
            postal_code: addressPostalCode,
          };
          // save the address to local storage. Add on server when checkout opens
          window.localStorage.setItem(LS_GUEST_USER_ADDRESS, JSON.stringify(guestAddress));
          dispatch(updateShowAddAddress(false));
        }
      } else {
        setErrorMessage(response?.description);
      }
    }
  }

  function onClickClose() {
    dispatch(updateShowOrderTypeSelect(true));
    dispatch(updateShowAddAddress(false));
  }

  return (
    <Wrapper>
      <ContentContainer>
        <TitleContainer>
          <Title>{t('@addNewAddress')}</Title>
          <CloseButton onClick={onClickClose}>
            <SvgCross />
          </CloseButton>
        </TitleContainer>

        <InputContainer>
          <InputItem>
            <Label>{t('@streetAddress')}</Label>
            <InputWithAutoLocate>
              <Input value={addressMain} onChange={(e) => setAddressMain(e.target.value)} ref={refAddressInput} placeholder={t('@streetAddress')} />
              <Autolocate onClick={updateCurrentPosition}>
                <SvgAutolocate />
              </Autolocate>
            </InputWithAutoLocate>
          </InputItem>
        </InputContainer>

        <InputContainer>
          <InputItem>
            <Label>{t('@additionalDeliveryInfo')}</Label>
            <Input placeholder={t('@additionalDeliveryInfo')} value={addressFloor} onChange={(e) => setAddressFloor(e.target.value)} />
          </InputItem>
        </InputContainer>

        <InputContainer>
          <InputItem>
            <Label>{t('@city')}</Label>
            <Input placeholder={t('@city')} value={addressCity} onChange={(e) => setAddressCity(e.target.value)} />
          </InputItem>
          <InputItem>
            <Label>{t('@postalCode')}</Label>
            <Input placeholder={t('@postalCode')} value={addressPostalCode} onChange={(e) => setAddressPostalCode(e.target.value)} />
          </InputItem>
        </InputContainer>

        <AddressTypeContainer>
          <Label>{t('@addressType')}</Label>
          <AddressTypeItemContainer>
            {[
              {
                title: 'HOME' as AddressTypes,
                icon: SvgHome,
              },
              {
                title: 'WORK' as AddressTypes,
                icon: SvgWork,
              },
              {
                title: 'OTHER' as AddressTypes,
                icon: SvgMap,
              },
            ].map((item) => {
              return (
                <AddressTypeItem active={addressType === item.title} onClick={() => setAddressType(item.title)}>
                  <item.icon />
                  <AddressTypeName>{item.title}</AddressTypeName>
                </AddressTypeItem>
              );
            })}
          </AddressTypeItemContainer>
        </AddressTypeContainer>

        {errorMessage && (
          <InputContainer>
            <Error>
              {t('@addressPart1')}
              <a href={`/${languageCode}/contact-us`}> {t('@contact')} </a>
              {t('@addressPart2')}
            </Error>
          </InputContainer>
        )}

        <InputContainer>
          <InputSubmit type="submit" value="SAVE ADDRESS" onClick={onClickSubmit} />
        </InputContainer>
      </ContentContainer>
    </Wrapper>
  );
};

export default AddressAdd;

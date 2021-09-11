import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SvgLocation from '../../../../public/assets/svg/address/map-2.svg';
// import SvgEdit from '../../../../public/assets/svg/edit.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import {
  selectBearerToken,
  selectCustomer,
  selectIsUserLoggedIn,
  updateExistCustomerAddressOrAddNew,
} from '../../../../redux/slices/user.slices.redux';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';
// import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { selectConfiguration, selectLanguageCode, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import PyApiHttpPostAddress from '../../../../http/pyapi/address/post.address.pyapi.http';
import { updateDeliveryFinances, updateSelectedAddressId } from '../../../../redux/slices/checkout.slices.redux';
import { AddressTypes } from './address-manager.common.templateOne.components';
import { updateShowAddAddress, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import { IGuestAddress } from './address-add.common.templateOne.components';
import { LS_GUEST_USER_ADDRESS } from '../../../../constants/keys-local-storage.constants';
import { useTranslation } from 'react-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

const Wrapper = styled.div`
  padding: 0 2rem 1rem 5rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;
const Input = styled.input<{ isAddressSelected: boolean }>`
  width: 100%;
  border: ${(p) => (p.isAddressSelected ? 'none' : p.theme.border)};
  border-radius: ${(p) => (p.isAddressSelected ? '0' : p.theme.borderRadius)}px;
  padding: ${(p) => p.theme.dimen.X4}px;
  font-family: inherit;
  outline: none;
  border-bottom: ${(p) => (p.isAddressSelected ? '1px solid rgba(0, 0, 0, 1)' : p.theme.border)};
  padding-right: ${(p) => (p.isAddressSelected ? '2rem' : `${p.theme.dimen.X4}px`)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
  }
`;

const HistoryAddressContainer = styled.div`
  padding-top: 0.5rem;
`;

const HistoryAddress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Address = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const AddressText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 14px;
`;

const AdvanceOptionContainer = styled.div``;

const OptionText = styled.p`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0;
    margin: 0;
  }
`;

const AdvanceOptionHeader = styled.div``;

const PlaceSelection = styled.div`
  display: flex;
`;

const StyledOptionsRadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    padding: 0.5rem;
    font-size: 12px;

    @media (max-width: ${BREAKPOINTS.sm}px) {
      padding: 0.5rem 0;
    }
  }
`;

const StyledOptionsRadioButton = styled.div<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  margin: 0 0.5rem;
  display: block;
  padding-right: 0.5rem;
  border-radius: 100%;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.selected && props.theme.primaryColor};
`;

const InputAdditionInstruction = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  outline: none;
  border: ${(p) => p.theme.border};
  padding: ${(p) => p.theme.dimen.X4}px;
  border-radius: ${(p) => p.theme.borderRadius}px;
`;

const Button = styled.button`
  font-weight: 700;
  cursor: pointer;
  background: #333;
  color: #fff;
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 18px;
  margin-top: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background: #444444;
  }
`;

const Error = styled.p`
  font-size: 12px;
  color: #f44336;
  margin: 0;
  padding: 0;
`;

let autoComplete: google.maps.places.Autocomplete;

const AddAddressExtendModel = () => {
  const refAddressInput = useRef<HTMLInputElement>(null);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const customerData = useAppSelector(selectCustomer);
  const shopId = useAppSelector(selectSelectedMenu);
  const bearerToken = useAppSelector(selectBearerToken);
  const languageCode = useAppSelector(selectLanguageCode);
  const configuration = useAppSelector(selectConfiguration);
  const { t } = useTranslation('add-address');

  const dispatch = useAppDispatch();

  const [addressMain, setAddressMain] = useState(''); /// ? Only for handle google search input

  const [address, setAddress] = useState<string>('');
  const [area, setArea] = useState<undefined | string>('');
  const [additionalInstruction, setAdditionalInstruction] = useState('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [addressType] = useState<AddressTypes>('OTHER');
  const [placeSelection, setPlaceSelection] = useState('Meet at door');

  const [addressList, setAddressList] = useState<Array<IParticularAddress>>([]);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // TODO: AutoComplete address input
  useEffect(() => {
    if (typeof window !== 'undefined' && refAddressInput.current) {
      autoComplete = new google.maps.places.Autocomplete(refAddressInput.current, {
        types: ['geocode'],
      });
      autoComplete.setFields(['address_component']);
      autoComplete.addListener('place_changed', onAddressChange);
    }
  }, [refAddressInput]);

  // TODO: Show address suggestions list
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let guestAddress = window.localStorage.getItem('@LS_GUEST_USER_ADDRESS')
      ? (JSON.parse(window.localStorage.getItem('@LS_GUEST_USER_ADDRESS') ?? '') as IParticularAddress)
      : undefined;

    if (isLoggedIn) setAddressList(customerData.all_address);
    else if (!isLoggedIn && guestAddress) setAddressList([guestAddress]);
  }, []);

  /**
   *
   * @param placeReceived String from google maps api
   */
  async function onAddressChange(placeReceived?: google.maps.places.PlaceResult) {
    const place = placeReceived || autoComplete.getPlace();

    if (place.address_components) {
      place.address_components.forEach((component, index) => {
        if (component.types[0] === 'route' || component.types[0] === 'street_number') {
          const street_number = place?.address_components?.filter((c) => c.types[0] === 'street_number')[0];

          setAddress(`${component.long_name} ${street_number?.long_name ?? ''}`);

          setAddressMain(`${component.long_name} ${street_number?.long_name ?? ''}`);
        } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1)
          setArea(component.long_name.includes('Innenstadt') ? 'Innenstadt' : component.long_name);
        else if (component.types[0] === 'locality') setCity(component.long_name);
        else if (component.types[0] === 'postal_code') setPostalCode(component.short_name);

        if (place?.address_components && index === place.address_components?.length - 1) setIsAddressSelected(true);
      });
    }
  }

  /**
   *
   * @param Object contains seperate portions of the address (floor, address, area, city, addressType, postalCode)
   */
  async function makeRequestToPyapi() {
    setErrorMessage(undefined);
    // amplitudeEvent(constructEventName(`address model save address`, 'button'), {});

    if (shopId) {
      console.log('addtional ', `${additionalInstruction}(${placeSelection})`);

      const response = await new PyApiHttpPostAddress(configuration).postAll({
        area: area ?? '',
        city,
        floor: `${additionalInstruction}(${placeSelection})` ?? '',
        address,
        addressType,
        shopId,
        postalCode,
        token: bearerToken,
      });

      if (response?.result && response.possibilities[shopId].is_available) {
        dispatch(updateDeliveryFinances(response.possibilities[shopId].details));

        if (isLoggedIn && bearerToken && response.customer.details) {
          const addressData: IParticularAddress = {
            id: response.customer.details?.customer_address_id,
            address_type: addressType,
            floor: `${additionalInstruction}(${placeSelection})` ?? '',
            address,
            country: '',
            postal_code: postalCode,
            city,
            state: '',
          };
          dispatch(updateExistCustomerAddressOrAddNew(addressData));
          dispatch(updateSelectedAddressId(response.customer.details?.customer_address_id));
          dispatch(updateShowAddAddress(false));
          dispatch(updateShowOrderTypeSelect(false));

          // amplitudeEvent(constructEventName(`address model save address user response`, 'success'), { addressData, response });
        } else {
          const guestAddress: IGuestAddress = {
            floor: `${additionalInstruction}(${placeSelection})` ?? '',
            address,
            address_type: addressType,
            city,
            postal_code: postalCode,
          };

          // save the address to local storage. Add on server when checkout opens
          window.localStorage.setItem(LS_GUEST_USER_ADDRESS, JSON.stringify(guestAddress));
          dispatch(updateShowAddAddress(false));
          dispatch(updateShowOrderTypeSelect(false));

          // amplitudeEvent(constructEventName(`address model save address guest response`, 'success'), guestAddress);
        }
      } else {
        setErrorMessage(response?.description);
        console.log('error descripton ', response?.description);
        // amplitudeEvent(constructEventName(`address model save address response`, 'error'), { description: response?.description });
      }
    }
  }

  /**
   *
   * @returns updating state of show address model extension
   */
  const handleDoneButtonClick = async () =>
    // TODO: call pyapi at end of the iteration
    await makeRequestToPyapi();

  /**
   *
   * @returns make selection of the history address
   */
  const hanldeHistoryAddressSelectionClick = async (existAddress: IParticularAddress) => {
    setIsAddressSelected(true);
    setPlaceSelection('Meet at door');

    // ?? Set exist address into local state
    setAdditionalInstruction(existAddress?.floor?.replace(/ *\([^)]*\) */g, '') ?? ''); // ? update the local state removed by paranthesis
    setAddressMain(existAddress?.address ?? '');
    setPostalCode(existAddress.postal_code);
    setAddress(existAddress?.address ?? '');
    setCity(existAddress.city);
  };

  return (
    <Wrapper>
      <InputContainer>
        {!!errorMessage && (
          <Error>
            {t('@addressPart1')}
            <a href={`/${languageCode}/contact-us`}> {t('@contact')} </a>
            {t('@addressPart2')}
          </Error>
        )}

        <Input
          value={addressMain}
          onChange={(e) => setAddressMain(e.target.value)}
          ref={refAddressInput}
          placeholder={'Add your address here'}
          isAddressSelected={isAddressSelected}
        />
      </InputContainer>

      {!!addressList.length && !isAddressSelected && (
        <HistoryAddressContainer>
          {addressList.map((history, index) => {
            if (index > 2) return null; // ? for showing only 3 recent addresses

            return (
              <HistoryAddress key={index}>
                <Address onClick={async () => await hanldeHistoryAddressSelectionClick(history)}>
                  <IconContainer>
                    <SvgLocation />
                  </IconContainer>

                  <AddressText>
                    {history.address} {history.floor}
                  </AddressText>
                </Address>

                {/* <EditIconContainer>
                  <SvgEdit />
                </EditIconContainer> */}
              </HistoryAddress>
            );
          })}
        </HistoryAddressContainer>
      )}

      {isAddressSelected && (
        <AdvanceOptionContainer>
          <AdvanceOptionHeader>
            <OptionText>Delivery Options</OptionText>

            <PlaceSelection>
              {[
                {
                  text: 'Meet at door',
                  selected: placeSelection === 'Meet at door',
                },
                {
                  text: 'Meet outside',
                  selected: placeSelection === 'Meet outside',
                },
                {
                  text: 'Leave at door',
                  selected: placeSelection === 'Leave at door',
                },
              ].map((option) => (
                <StyledOptionsRadioButtonContainer onClick={() => setPlaceSelection(option.text)}>
                  <StyledOptionsRadioButton selected={option.selected} />

                  <span>{option.text}</span>
                </StyledOptionsRadioButtonContainer>
              ))}
            </PlaceSelection>
          </AdvanceOptionHeader>

          <InputAdditionInstruction
            value={additionalInstruction}
            onChange={(e) => setAdditionalInstruction(e.target.value)}
            placeholder={'Add delivery instructions'}
          />

          <Button onClick={handleDoneButtonClick}>Done</Button>
        </AdvanceOptionContainer>
      )}
    </Wrapper>
  );
};

export default AddAddressExtendModel;

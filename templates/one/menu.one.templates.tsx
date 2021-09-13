import React, { FunctionComponent, ReactNode, useRef } from 'react';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.redux';
import { useEffect } from 'react';
import { selectShop, selectSiblings } from '../../redux/slices/index.slices.redux';
import { useState } from 'react';
import { ITimingsDay } from '../../interfaces/common/shop.common.interfaces';
import {
  ICheckoutOrderTypes,
  updateClearCheckout,
  updateOrderType,
  updateSelectedAddressId,
} from '../../redux/slices/checkout.slices.redux';
import { updateClearCart } from '../../redux/slices/cart.slices.redux';
import PyApiHttpPostAddress from '../../http/pyapi/address/post.address.pyapi.http';
import { selectConfiguration } from '../../redux/slices/configuration.slices.redux';
import { ISibling } from '../../interfaces/common/sibling.common.interfaces';
import { IGuestAddress } from '../../components/templateOne/common/addresses/address-add.common.templateOne.components';
import { LS_GUEST_USER_ADDRESS } from '../../constants/keys-local-storage.constants';
import { selectBearerToken, selectIsUserLoggedIn, updateExistCustomerAddressOrAddNew } from '../../redux/slices/user.slices.redux';

import { useTranslation } from 'next-i18next';
import SvgAutolocate from '../../public/assets/svg/autolocate.svg';
import CustomLink from '../../components/templateOne/common/amplitude/customLink';
import { IParticularAddress } from '../../interfaces/common/customer.common.interfaces';

type Filters = 'has_pickup' | 'has_delivery' | 'has_dinein';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const FullHeightColumn = styled.div`
  float: left;
`;

const FullHeightColumnLeft = styled(FullHeightColumn)`
  position: relative;
  width: 100%;
  height: 60%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: 40%;
    height: 100%;
  }
`;

const FullHeightColumnRight = styled(FullHeightColumn)`
  position: relative;
  width: 100%;
  height: 300px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: 60%;
    height: 100%;
  }
`;

const ContentContatiner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  position: sticky;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: ${(props) => props.theme.border};
`;

const SelectionItem = styled.p<{ active: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background: #f9f9f9;
  margin: 0;
  padding: ${(props) => props.theme.dimen.X4}px;
  border-bottom: 4px solid ${(props) => (props.active ? props.theme.primaryColor : 'transparent')};
  border-right: ${(props) => props.theme.border};
  cursor: pointer;
`;

const List = styled.ul`
  padding: 0 ${(props) => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100% - 56px);
    overflow: auto;
  }
`;

const ListItem = styled.li<{ active: boolean }>`
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  margin: ${(props) => props.theme.dimen.X4}px 0;
  ${(props) =>
    props.active &&
    css`
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      border-color: ${(props) => props.theme.primaryColor};
    `}
`;

const ListItemLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  padding: 6px;
`;

const Title = styled.h2`
  font-size: 16px;
  padding: 0;
  margin: ${(props) => props.theme.dimen.X4}px 0 0 0;
  line-height: 1.2;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Address = styled.div`
  padding: ${(props) => props.theme.dimen.X3}px 0;
  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
`;

const TimingContainerHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 0 0 ${(props) => props.theme.dimen.X4}px 0;
`;

const TimingContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TimingContainerTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const TimingContainerTiming = styled.div``;

const InfoWithOrderButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoContainer = styled.div``;

const OrderButton = styled.a`
  display: block;
  font-weight: 700;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: ${(props) => props.theme.border};
  margin: ${(props) => props.theme.dimen.X4}px;
  padding: ${(props) => props.theme.dimen.X}px ${(props) => props.theme.dimen.X4}px;
  background: ${(props) => props.theme.primaryColor};
`;

const InputContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex: 1;
`;

const Input = styled.input`
  display: flex;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  margin-top: ${(props) => props.theme.dimen.X4}px;
  font-family: inherit;
`;

const EnterAddress = styled.div`
  width: 100%;
  background: #f9f9f9;
  padding: ${(props) => props.theme.dimen.X4}px;
  margin-top: ${(props) => props.theme.dimen.X4}px;
  background: #e9e9e9;
  border-radius: ${(props) => props.theme.borderRadius}px;
  text-align: center;
`;

const Autolocate = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 46px;
  height: 46px;
  padding: 12px;
`;

const InputWithAutoLocate = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

const SvgLocationImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 1rem 0;
`;

let map: google.maps.Map;
let autoComplete: google.maps.places.Autocomplete;
const markers: Record<
  string,
  {
    marker: google.maps.Marker;
    infoWindow: google.maps.InfoWindow;
  }
> = {};
let currentLocationMarker: google.maps.Marker;
let latlngbounds: google.maps.LatLngBounds;

let tempSelId: number | null = null;

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  const dispatch = useAppDispatch();
  const shopData = useAppSelector(selectShop);
  const siblingsData = useAppSelector(selectSiblings);
  const bearerToken = useAppSelector(selectBearerToken);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const configuration = useAppSelector(selectConfiguration);
  const { t } = useTranslation('page-menu');
  const [locationPermission, setLocationPermission] = useState('not-prompt');

  const [restaurantsToShow, setRestaurantsToShow] = useState<Array<ISibling> | undefined>(undefined);
  const [deliveryFilterData, setDeliveryFilterData] = useState<Array<ISibling>>();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const refAddressInput = useRef<HTMLInputElement>(null);

  const [addressMain, setAddressMain] = useState('');

  const [filterName, setFilterName] = useState<Filters>('has_delivery');
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  // ?? Main address component state
  const [address, setAddress] = useState<string>('');
  const [area, setArea] = useState<undefined | string>('');
  const [additionalInstruction, setAdditionalInstruction] = useState('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  useEffect(noDeliveryOptionsAvailable, []);

  useEffect(() => {
    if (tempSelId) markers[tempSelId]?.infoWindow.close();

    if (selectedId)
      markers[selectedId]?.infoWindow.open({
        anchor: markers[selectedId].marker,
        map,
        shouldFocus: false,
      });
    tempSelId = selectedId;
  }, [selectedId]);

  useEffect(() => {
    initMap();
    if (typeof window !== 'undefined') {
      dispatch(updateClearCart());
      dispatch(updateClearCheckout());
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && refAddressInput.current) {
      autoComplete = new google.maps.places.Autocomplete(refAddressInput.current, {
        types: ['geocode'],
      });

      autoComplete.setFields(['address_component', 'geometry']);
      autoComplete.addListener('place_changed', onAddressChange);
    }
  }, [refAddressInput]);

  // TODO: For updating markers on map
  useEffect(() => {
    const tempRestaurantsToShow =
      filterName === 'has_delivery' && locationPermission === 'granted'
        ? deliveryFilterData
        : siblingsData.filter((sibling) => sibling.address[filterName]);

    setRestaurantsToShow(tempRestaurantsToShow);

    Object.keys(markers).map((i) => markers[i].marker.setMap(tempRestaurantsToShow?.find((o) => o.id === Number(i)) ? map : null));

    if (selectedId) markers[selectedId]?.infoWindow.close();

    setSelectedId(null);
  }, [filterName, deliveryFilterData]);

  // TODO: Update address main on search field
  useEffect(() => {
    if (isAddressSelected) {
      setAddressMain(`${address} ${postalCode} ${city}`);
      console.log(`${address} ${postalCode} ${city}`);
      getAvaibleBasedOnAdress();
    }
  }, [isAddressSelected, postalCode]);

  function initMap() {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 20,
      mapId: '3a7840eca8fbb359',
    });

    latlngbounds = new google.maps.LatLngBounds();

    google.maps.event.addListener(map, 'click', function () {
      Object.keys(markers).map((i) => markers[i].infoWindow.close());
    });

    siblingsData.forEach((sibling) => {
      if (!sibling.address.lat || !sibling.address.lon) return; // ? Skip the marker if not lat and lon exist

      latlngbounds.extend(new google.maps.LatLng(sibling.address.lat, sibling.address.lon));
      const position = new google.maps.LatLng(sibling.address.lat, sibling.address.lon);

      const area = sibling.address?.area ? sibling.address?.area + ' ' : '';
      const address = sibling.address?.address || '';
      const city = sibling.address?.city || '';
      const postalCode = sibling.address?.postal_code || '';

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <p>${area}${address}</p>
          <p>${postalCode} ${city}</p>
        `,
      });

      const marker = new google.maps.Marker({
        position,
        icon: {
          url: '/assets/png/restaurant.png',
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
        },
        map: map,
      });

      marker.addListener('click', () => {
        if (tempSelId) markers[tempSelId]?.infoWindow.close();

        setSelectedId(sibling.id);

        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });

        document.getElementById(`sibling-item-id${sibling.id}`)?.scrollIntoView({
          behavior: 'smooth',
        });
      });

      markers[sibling.id] = {
        marker,
        infoWindow,
      };
    });

    map.fitBounds(latlngbounds);

    currentLocationMarker = new google.maps.Marker({
      icon: {
        url: '/assets/png/user.png',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      },
      map: null,
    });

    if (navigator.geolocation) {
      updateCurrentPositionByPermission();
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

  async function updateCurrentPositionByPermission() {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        if (result.state === 'granted') {
          setLocationPermission('granted');
          updateCurrentPosition(true);
          // TODO: If granted then you can directly call your function here
        } else if (result.state === 'prompt') {
          setLocationPermission('prompt');
          updateCurrentPosition(true);
        } else if (result.state === 'denied') {
          setLocationPermission('denied');
          // TODO: If denied then you have to show instructions to enable location
          console.log('Permission denied!');
        }
      });
    } else {
      setLocationPermission('none');
      alert('Sorry Not available!');
    }
  }

  function updateCurrentPosition(setCurrentAddress: boolean) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      if (setCurrentAddress) geocodeLatLng(pos);

      latlngbounds.extend(new google.maps.LatLng(pos.lat, pos.lng));
      map.fitBounds(latlngbounds);

      currentLocationMarker.setPosition(pos);
      currentLocationMarker.setMap(map);

      setLocationPermission('granted');
    });
  }

  function setFilterAndOrderType(filter: Filters) {
    setFilterName(filter);
  }

  function getOrderTypeConstant(s: string) {
    let orderType: ICheckoutOrderTypes | null = null;
    switch (s) {
      case 'has_delivery':
        orderType = 'DELIVERY';
        break;
      case 'has_dinein':
        orderType = 'DINE_IN';
        break;
      case 'has_pickup':
        orderType = 'PICKUP';
        break;
      default:
        orderType = 'PICKUP';
    }
    return orderType;
  }

  async function getAvaibleBasedOnAdress() {
    if (shopData?.id) {
      const response = await new PyApiHttpPostAddress(configuration).postAll({
        floor: additionalInstruction,
        address,
        addressType: 'OTHER',
        city,
        area: area ?? '',
        shopId: shopData.id,
        postalCode,
      });

      if (response && response.result) {
        const possibilities = Object.keys(response.possibilities).filter((i) => response.possibilities[i].is_available);

        setDeliveryFilterData(siblingsData.filter((i) => possibilities.indexOf(String(i.id)) !== -1));

        if (possibilities.length > 0) {
          if (isLoggedIn && bearerToken && response.customer.details) {
            const addressData: IParticularAddress = {
              id: response.customer.details?.customer_address_id,
              address_type: 'OTHER',
              floor: `${additionalInstruction}` ?? '',
              address,
              country: '',
              postal_code: postalCode,
              city,
              state: '',
              area: area ?? '',
            };
            dispatch(updateExistCustomerAddressOrAddNew(addressData));
            dispatch(updateSelectedAddressId(response.customer.details?.customer_address_id));
          } else {
            const guestAddress: IGuestAddress = {
              floor: additionalInstruction,
              address,
              address_type: 'OTHER',
              city,
              postal_code: postalCode,
              area: area ?? '',
            };

            // save the address to local storage. Add on server when checkout opens
            window.localStorage.setItem(LS_GUEST_USER_ADDRESS, JSON.stringify(guestAddress));
          }
        }
      } else {
        noDeliveryOptionsAvailable();
      }
    }
  }

  /**
   * @description for updating states of not deliverable options
   */
  function noDeliveryOptionsAvailable() {
    dispatch(updateSelectedAddressId(null));
    setDeliveryFilterData([]);
    window.localStorage.removeItem(LS_GUEST_USER_ADDRESS);
  }

  /**
   *
   * @param placeReceived google.maps.places to make sepearate components of address
   */
  function onAddressChange(placeReceived?: google.maps.places.PlaceResult) {
    const place = placeReceived || autoComplete.getPlace();

    if (place.address_components) {
      place.address_components.forEach((component, index) => {
        if (component.types[0] === 'route' || component.types[0] === 'street_number') {
          const street_number = place?.address_components?.filter((c) => c.types[0] === 'street_number')[0];

          setAddress(`${component.long_name} ${street_number?.long_name ?? ''}`);
        } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1)
          setArea(component.long_name.includes('Innenstadt') ? 'Innenstadt' : component.long_name);
        else if (component.types[0] === 'locality') setCity(component.long_name);
        else if (component.types[0] === 'postal_code') setPostalCode(component.short_name);

        if (place?.address_components && index === place.address_components?.length - 1) {
          setIsAddressSelected(true);
        }
      });
    }

    currentLocationMarker.setPosition(place.geometry?.location);
  }

  /**
   * @returns update the state of orderType selection on checkout
   */
  function handleMenuOrderTypeChange() {
    // TODO: Fix Only update if options available
    dispatch(updateOrderType(getOrderTypeConstant(filterName)));
  }

  let restaurantListView: ReactNode;

  if (restaurantsToShow && restaurantsToShow.length > 0) {
    restaurantListView = restaurantsToShow.map((sibling) => {
      const area = sibling.address?.area ? sibling.address?.area + ' ' : '';
      const address = sibling.address?.address || '';
      const city = sibling.address?.city || '';
      const postalCode = sibling.address?.postal_code || '';

      const day = new Date().toLocaleString('en-us', { weekday: 'long' }).toUpperCase();

      return (
        <ListItem
          key={`${sibling.id}`}
          id={`sibling-item-id${sibling.id}`}
          active={sibling.id === selectedId}
          onClick={() => setSelectedId(sibling.id)}
        >
          <ListItemLink>
            <ItemImage src={sibling.logo} />
            <ContentContatiner>
              <InfoWithOrderButton>
                <InfoContainer>
                  <Title>{sibling.name}</Title>
                  <Address>
                    <p>
                      {area}
                      {address}
                    </p>
                    <p>
                      {postalCode} {city}
                    </p>
                  </Address>
                </InfoContainer>

                <CustomLink
                  href={`/menu/${sibling.id}`}
                  placeholder={t('@order')}
                  amplitude={{
                    type: 'button',
                    text: t('@order'),
                    eventProperties: sibling,
                  }}
                  callback={handleMenuOrderTypeChange}
                  Override={OrderButton}
                />
                {/* <OrderButton href={`/${languageCode}/menu/${sibling.id}`}>{t('@order')}</OrderButton> */}
              </InfoWithOrderButton>

              <TimingContainerHolder>
                <TimingContainer>
                  <TimingContainerTitle>{t('@store-hours')}</TimingContainerTitle>

                  <TimingContainerTiming>
                    {(sibling.timings[day] as ITimingsDay).shop?.timings?.map((t) => `${t.open} - ${t.close}`).join(', ') || (
                      <span style={{ color: 'red', fontWeight: 500 }}>{t('@closed')}</span>
                    )}
                  </TimingContainerTiming>
                </TimingContainer>

                <TimingContainer>
                  <TimingContainerTitle>{t('@delivery-hours')}</TimingContainerTitle>

                  <TimingContainerTiming>
                    {(sibling.timings[day] as ITimingsDay).delivery?.timings?.map((t) => `${t.open} - ${t.close}`).join(', ') || (
                      <span style={{ color: 'red', fontWeight: 500 }}>{t('@closed')}</span>
                    )}
                  </TimingContainerTiming>
                </TimingContainer>
              </TimingContainerHolder>
            </ContentContatiner>
          </ListItemLink>
        </ListItem>
      );
    });
  } else {
    if (filterName === 'has_delivery') {
      if (restaurantsToShow && restaurantsToShow.length === 0) {
        restaurantListView = (
          <EnterAddress>
            <p>{t('@not-deliverable')}</p>
            <SvgLocationImage src="/assets/png/location.png" />
          </EnterAddress>
        );
      } else {
        restaurantListView = (
          <EnterAddress>
            <p>{t('@search')}</p>
          </EnterAddress>
        );
      }
    }
  }

  return (
    <ColumnContainer>
      <FullHeightColumnLeft>
        <SelectionContainer>
          {[
            {
              filter: 'has_delivery' as Filters,
              title: t('@delivery'),
            },
            {
              filter: 'has_pickup' as Filters,
              title: t('@pickup'),
            },
            {
              filter: 'has_dinein' as Filters,
              title: t('@dine-in'),
            },
          ].map((item) => (
            <SelectionItem key={item.filter} active={filterName === item.filter} onClick={() => setFilterAndOrderType(item.filter)}>
              {item.title}
            </SelectionItem>
          ))}
        </SelectionContainer>

        <List>
          <InputContainer visible={filterName === 'has_delivery'}>
            <InputWithAutoLocate>
              <Input
                style={{
                  flex: 1,
                }}
                value={addressMain}
                onChange={(e) => {
                  setAddressMain(e.target.value);
                }}
                ref={refAddressInput}
                placeholder={t('@where-deliver')}
              />
              <Autolocate onClick={updateCurrentPositionByPermission}>
                <SvgAutolocate />
              </Autolocate>
            </InputWithAutoLocate>

            <Input
              style={{
                width: 100,
                marginLeft: 12,
              }}
              value={additionalInstruction}
              onChange={(e) => setAdditionalInstruction(e.target.value)}
              placeholder={t('@optional')}
            />
          </InputContainer>

          {restaurantListView}
        </List>
      </FullHeightColumnLeft>

      <FullHeightColumnRight>
        <MapContainer id="map" />
      </FullHeightColumnRight>
    </ColumnContainer>
  );
};

export default MenuPageTemplateOne;

import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useState } from 'react';
import { useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import { LS_GUEST_USER_ADDRESS } from '../../../../constants/keys-local-storage.constants';
import PyApiHttpPostAddress from '../../../../http/pyapi/address/post.address.pyapi.http';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import {
  selectDeliveryFinances,
  selectOrderType,
  selectSelectedAddressId,
  selectShowDateTimeSelect,
  selectWantAt,
  updateSelectedAddressId,
  updateShowDateTimeSelect,
  updateWantAt,
} from '../../../../redux/slices/checkout.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import { selectConfiguration, selectLanguage, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings, selectTimings } from '../../../../redux/slices/index.slices.redux';
import { selectShowAddress, selectShowOrderTypeSelect, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import {
  selectAddressById,
  selectAddressByType,
  selectBearerToken,
  selectCustomer,
  selectIsUserLoggedIn,
  updateExistCustomerAddressOrAddNew,
  updateLoadAddressesList,
} from '../../../../redux/slices/user.slices.redux';
import RestaurantTimingUtils, { isShopOpened } from '../../../../utils/restaurant-timings.utils';
import AddressAdd, { IGuestAddress } from '../../common/addresses/address-add.common.templateOne.components';
import OrderTypeManager from '../../common/orderType/order-type-manager.menu.pages.templateOne.components';
import { INITIAL_TIMING_STATE } from '../index/hero.index.pages.templateOne.components';
import { StyledCheckoutCard, StyledCheckoutText } from './customer-info.checkout.pages.templateOne.components';
import CheckoutDateTime from './date-time-selector.checkout.pages.templateOne.components';
import EditButton from './edit-button.checkout.pages.templateOne.components';
import EditContainer from './edit-container.checkout.pages.templateOne.components';
import NodeApiHttpGetUserAllAddress from '../../../../http/nodeapi/account/get.account.all-address.nodeapi.http';

const AddressSelected = styled.p`
  font-size: 14px;
  margin: -12px 0 0 0;
`;

const NotVerifyText = styled.p`
  color: #ff0000;
  font-size: 0.8rem;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MinAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NotVerifyIcon = styled.img`
  height: 20px;
`;

const AddressContainer = styled.div`
  padding: 0 0.3rem;
`;

const timings = new RestaurantTimingUtils();

const INITIAL_ADDRESS: IGuestAddress = {
  address: '',
  address_type: 'OTHER',
  city: '',
  floor: '',
  postal_code: '',
};

const CheckoutPageSummary: FunctionComponent = ({}) => {
  const currentLanguage = useAppSelector(selectLanguage);

  const orderType = useAppSelector(selectOrderType);
  const wantAtData = useAppSelector(selectWantAt);
  const address = useAppSelector(selectAddress);
  const siblings = useAppSelector(selectSiblings);
  const shopData = useAppSelector(selectShop);
  const timingsData = useAppSelector(selectTimings);
  const showAddAddress = useAppSelector(selectShowAddress);
  const selectedMenuId = useAppSelector(selectSelectedMenu);
  const checkoutAddressId = useAppSelector(selectSelectedAddressId);
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect);
  const showDateTimeSelect = useAppSelector(selectShowDateTimeSelect);
  const selectedAddress = useAppSelector((state) => selectAddressById(state, checkoutAddressId));
  const deliveryFinances = useAppSelector(selectDeliveryFinances);
  const cartData = useAppSelector(selectCart);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const configuration = useAppSelector(selectConfiguration);
  const bearerToken = useAppSelector(selectBearerToken);
  const addressByType = useAppSelector((state) => selectAddressByType(state, 'HOME'));
  const shopId = useAppSelector(selectSelectedMenu);
  const customerData = useAppSelector(selectCustomer);

  const [userAddress, setUserAddress] = useState<IGuestAddress>(INITIAL_ADDRESS);

  const [minAmountCheck, setMinAmountCheck] = useState(true);
  const [shop, setShop] = useState<IShopAvailablity>(INITIAL_TIMING_STATE);

  const dispatch = useAppDispatch();
  const { t } = useTranslation('page-checkout');

  const [addressData, setAddressData] = useState<IAddress | null | undefined>(undefined);

  function isOrderPossible() {
    if (orderType === 'DELIVERY') {
      return deliveryFinances && deliveryFinances.amount ? cartData.cartCost >= deliveryFinances.amount : true;
    } else {
      return true;
    }
  }

  async function addGuestAddressOnServerIfExists() {
    // check if guest address exists. If it does add it to server
    const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS);
    if (guestAddressString && bearerToken && shopId) {
      const guestAddress = JSON.parse(guestAddressString) as IGuestAddress;
      const response = await new PyApiHttpPostAddress(configuration).postAll({
        floor: '',
        shopId: shopId,
        address: guestAddress.address,
        addressType: guestAddress.address_type,
        city: guestAddress.city,
        postalCode: guestAddress.postal_code,
        area: '',
        token: bearerToken,
      });
      console.log(response);
      if (response) {
        if (!response.result) {
          dispatch(
            updateError({
              show: true,
              message: response.description,
              severity: 'error',
            }),
          );
          return;
        }

        if (response.customer.is_customer && response.customer.details?.customer_address_id) {
          window.localStorage.removeItem(LS_GUEST_USER_ADDRESS);
          const addressAdded: IParticularAddress = {
            id: response.customer.details.customer_address_id,
            address_type: guestAddress.address_type,
            floor: guestAddress.floor,
            address: guestAddress.address,
            country: '',
            postal_code: guestAddress.postal_code,
            city: guestAddress.city,
            state: '',
          };
          dispatch(updateExistCustomerAddressOrAddNew(addressAdded));
          dispatch(updateSelectedAddressId(response.customer.details.customer_address_id));
        } else {
          dispatch(updateSelectedAddressId(addressByType?.id));
        }
      }
    }
  }

  useEffect(() => {
    if (shopData?.id == selectedMenuId) setAddressData(address);
    else setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);
  }, []);

  // TODO: Update delivery or pickup timing of the order
  useEffect(() => {
    const timingList = timings.generateDates();
    let foundDateTime = false;
    for (let i = 0; i < timingList.length; i++) {
      const selectedDate = timingList[i];
      if (selectedDate && timingsData && orderType && addressData?.prepare_time && addressData?.delivery_time) {
        const timeData = timings.generateTimeList({
          date: selectedDate,
          timingsData,
          type: orderType,
          interval: {
            pickup_time: addressData?.prepare_time,
            delivery_time: addressData?.delivery_time,
          },
          language: currentLanguage,
        });
        if (timeData.length > 0) {
          dispatch(updateWantAt({ date: selectedDate, time: timeData[0] }));
          foundDateTime = true;
          break;
        }
      }
    }
    if (!foundDateTime) updateWantAt(null);
  }, [orderType, addressData?.prepare_time, addressData?.delivery_time]);

  // TODO: Checking min amount value
  useEffect(() => {
    if (orderType === 'DELIVERY') setMinAmountCheck(isOrderPossible());
  }, [orderType, deliveryFinances?.amount]);

  // TODO: Pre order checking
  useEffect(() => {
    if (!address?.has_delivery && !address?.has_pickup && !address?.has_dinein && !address?.has_reservations)
      return setShop({
        availability: false,
        isClosed: true,
      });

    setShop(isShopOpened(timingsData, moment(), { has_pickup: address.has_pickup, has_delivery: address.has_delivery }));
  }, []);

  // TODO: User address update depends on login status
  useEffect(() => {
    async function handleUserAddressUpdate() {
      const addressResponse = await new NodeApiHttpGetUserAllAddress(configuration, bearerToken ?? '').get({});
      dispatch(updateLoadAddressesList(addressResponse?.data.customer_address));
    }

    if (orderType === 'DELIVERY') {
      const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS);

      // * If user logged in
      if (isUserLoggedIn) {
        if (!customerData.all_address?.length) handleUserAddressUpdate();

        // * If selected address already there
        if (selectedAddress) setUserAddress(selectedAddress as IGuestAddress);
        // * Not selected but guestAddressString is there
        else if (guestAddressString) addGuestAddressOnServerIfExists();
      } else if (guestAddressString) {
        const guestAddress = JSON.parse(guestAddressString) as IGuestAddress;
        setUserAddress(guestAddress);
      }
    }
  }, [isUserLoggedIn, deliveryFinances, orderType, selectedAddress]);

  return (
    <StyledCheckoutCard>
      <Row>
        <Col xs={12}>
          <EditContainer>
            <TextContainer>
              <StyledCheckoutText>
                {orderType === 'DINE_IN' ? t('@dine-in') : t(`@${orderType?.toLowerCase()}`)}{' '}
                <span>{!shop.availability && !shop.isClosed && `(${t('@pre-order')})`}</span>
              </StyledCheckoutText>

              {orderType === 'DELIVERY' && !minAmountCheck && (
                <MinAmount>
                  <NotVerifyIcon src="assets/png/information.png" alt="info" />
                  <NotVerifyText>
                    {t('@min-required')} €{deliveryFinances?.amount}
                  </NotVerifyText>
                </MinAmount>
              )}
            </TextContainer>

            <EditButton onClick={() => dispatch(updateShowOrderTypeSelect(true))} />
          </EditContainer>

          {orderType === 'DELIVERY' ? (
            <AddressContainer>
              <AddressSelected>{userAddress?.address}</AddressSelected>
              <AddressSelected style={{ marginTop: -4 }}>
                {userAddress?.postal_code} {userAddress?.city}
              </AddressSelected>
            </AddressContainer>
          ) : (
            <></>
          )}

          <EditContainer>
            <StyledCheckoutText>{wantAtData ? `${wantAtData?.date?.label} (${wantAtData?.time?.label})` : t('@select-time')}</StyledCheckoutText>
            <EditButton onClick={() => dispatch(updateShowDateTimeSelect(true))} />
          </EditContainer>
        </Col>
      </Row>

      <div>
        {(showSelectOrderType || orderType === null) && !showAddAddress ? (
          <OrderTypeManager key="key-ajkndalkwdmalkwmdlkw" />
        ) : (
          (showAddAddress ||
            (orderType === 'DELIVERY' &&
              checkoutAddressId === null &&
              orderType === 'DELIVERY' &&
              !window.localStorage.getItem(LS_GUEST_USER_ADDRESS))) && <AddressAdd />
        )}
      </div>
      <div>{showDateTimeSelect && <CheckoutDateTime />}</div>
    </StyledCheckoutCard>
  );
};

export default CheckoutPageSummary;

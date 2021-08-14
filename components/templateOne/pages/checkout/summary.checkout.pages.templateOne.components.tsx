import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useState } from 'react';
import { useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import { LS_GUEST_USER_ADDRESS } from '../../../../constants/keys-local-storage.constants';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import {
  selectDeliveryFinances,
  selectOrderType,
  selectSelectedAddressId,
  selectShowDateTimeSelect,
  selectWantAt,
  updateShowDateTimeSelect,
  updateWantAt,
} from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguage, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings, selectTimings } from '../../../../redux/slices/index.slices.redux';
import { selectShowAddress, selectShowOrderTypeSelect, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import { selectAddressById } from '../../../../redux/slices/user.slices.redux';
import RestaurantTimingUtils, { isShopOpened } from '../../../../utils/restaurant-timings.utils';
import AddressAdd from '../../common/addresses/address-add.common.templateOne.components';
import OrderTypeManager from '../../common/orderType/order-type-manager.menu.pages.templateOne.components';
import { INITIAL_TIMING_STATE } from '../index/hero.index.pages.templateOne.components';
import { StyledCheckoutCard, StyledCheckoutText } from './customer-info.checkout.pages.templateOne.components';
import CheckoutDateTime from './date-time-selector.checkout.pages.templateOne.components';
import EditButton from './edit-button.checkout.pages.templateOne.components';
import EditContainer from './edit-container.checkout.pages.templateOne.components';

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

const timings = new RestaurantTimingUtils();

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

  const [minAmountCheck, setMinAmountCheck] = useState(false);
  const [shop, setShop] = useState<IShopAvailablity>(INITIAL_TIMING_STATE);

  const dispatch = useAppDispatch();
  const { t } = useTranslation('page-checkout');

  const [addressData, setAddressData] = useState<IAddress | null | undefined>(undefined);

  function isOrderPossible() {
    if (orderType === 'DELIVERY') {
      return deliveryFinances && deliveryFinances.amount ? cartData.cartCost >= deliveryFinances.amount : false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (shopData?.id == selectedMenuId) setAddressData(address);
    else setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);
  }, []);

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

    if (orderType === 'DELIVERY') setMinAmountCheck(isOrderPossible());
  }, [orderType, addressData?.prepare_time, addressData?.delivery_time]);

  // TODO: Pre order checking
  useEffect(() => {
    if (!address?.has_delivery && !address?.has_pickup && !address?.has_dinein && !address?.has_reservations)
      return setShop({
        availability: false,
        isClosed: true,
      });

    setShop(isShopOpened(timingsData, moment(), { has_pickup: address.has_pickup, has_delivery: address.has_delivery }));
  }, []);

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
            <>
              <AddressSelected>{selectedAddress?.address}</AddressSelected>
              <AddressSelected style={{ marginTop: -4 }}>
                {selectedAddress?.postal_code} {selectedAddress?.city}
              </AddressSelected>
            </>
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

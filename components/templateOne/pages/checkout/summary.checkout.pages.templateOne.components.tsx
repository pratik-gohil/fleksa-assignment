import React, { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { LS_GUEST_USER_ADDRESS } from "../../../../constants/keys-local-storage.constants";
import { IAddress } from "../../../../interfaces/common/address.common.interfaces";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectOrderType, selectSelectedAddressId, selectShowDateTimeSelect, selectWantAt, updateShowDateTimeSelect, updateWantAt } from "../../../../redux/slices/checkout.slices.redux";
import { selectSelectedMenu } from "../../../../redux/slices/configuration.slices.redux";
import { selectAddress, selectShop, selectSiblings, selectTimings } from "../../../../redux/slices/index.slices.redux";
import { selectShowAddress, selectShowOrderTypeSelect, updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";
import { selectAddressById } from "../../../../redux/slices/user.slices.redux";
import RestaurantTimingUtils from "../../../../utils/restaurant-timings.utils";
import AddressAdd from "../../common/addresses/address-add.common.templateOne.components";
import OrderTypeManager from "../../common/orderType/order-type-manager.menu.pages.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutText, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import CheckoutDateTime from "./date-time-selector.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

const AddressSelected = styled.p`
  font-size: 14px;
  margin: -12px 0 0 0;
`

const timings = new RestaurantTimingUtils();

const CheckoutPageSummary: FunctionComponent = ({}) => {
  const orderType = useAppSelector(selectOrderType)
  const wantAtData = useAppSelector(selectWantAt)
  const address = useAppSelector(selectAddress);
  const siblings = useAppSelector(selectSiblings);
  const shopData = useAppSelector(selectShop);
  const timingsData = useAppSelector(selectTimings);
  const showAddAddress = useAppSelector(selectShowAddress)
  const selectedMenuId = useAppSelector(selectSelectedMenu);
  const checkoutAddressId = useAppSelector(selectSelectedAddressId)
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect)
  const showDateTimeSelect = useAppSelector(selectShowDateTimeSelect)
  const selectedAddress = useAppSelector(state => selectAddressById(state, checkoutAddressId))
  const dispatch = useAppDispatch()

  const [ addressData, setAddressData ] = useState<IAddress|null|undefined>(undefined)

  useEffect(() => {
    if (shopData?.id == selectedMenuId) {
      setAddressData(address)
    } else {
      setAddressData(siblings.find(item => item.id == selectedMenuId)?.address)
    }
  }, [ ])

  useEffect(() => {
    const timingList = timings.generateDates()
    let foundDateTime = false
    for (let i = 0; i < timingList.length; i++) {
      const selectedDate = timingList[i]
      if (selectedDate && timingsData && orderType && addressData?.prepare_time && addressData?.delivery_time) {
        const timeData = timings.generateTimeList({
          date: selectedDate,
          timingsData,
          type: orderType,
          interval: {
            pickup_time: addressData?.prepare_time,
            delivery_time: addressData?.delivery_time,
          },
        });
        if (timeData.length > 0) {
          dispatch(updateWantAt({ date: selectedDate, time: timeData[0] }))
          foundDateTime = true
          break
        }
      }
    }
    if (!foundDateTime) updateWantAt(null)
  }, [ orderType, addressData?.prepare_time, addressData?.delivery_time ])

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>SUMMARY</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <EditContainer>
          <StyledCheckoutText>
            {orderType === "DINE_IN"? "DINE-IN": orderType}
          </StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowOrderTypeSelect(true))} />
        </EditContainer>
        {orderType === "DELIVERY"? <AddressSelected>{[
              selectedAddress?.floor,
              selectedAddress?.area,
              selectedAddress?.address,
              selectedAddress?.city,
              selectedAddress?.postal_code
            ].filter(i => i && i.length).join(", ")}</AddressSelected>: <></>}
        <EditContainer>
          <StyledCheckoutText>{wantAtData? `${wantAtData?.date.label} (${wantAtData?.time.label})`: "Select Time"}</StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowDateTimeSelect(true))} />
        </EditContainer>
      </Col>
    </Row>
    <div>
      {((showSelectOrderType || orderType === null) && !showAddAddress)
        ? <OrderTypeManager key="key-ajkndalkwdmalkwmdlkw" />
        : (showAddAddress
          || (orderType === "DELIVERY" && checkoutAddressId === null
          && orderType === "DELIVERY" && !window.localStorage.getItem(LS_GUEST_USER_ADDRESS))) && <AddressAdd />}
    </div>
    <div>
      {showDateTimeSelect && <CheckoutDateTime />}
    </div>
  </StyledCheckoutCard>
}

export default CheckoutPageSummary

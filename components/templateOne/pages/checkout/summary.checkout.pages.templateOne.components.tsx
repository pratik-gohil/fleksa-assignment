import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { Row, Col } from "react-grid-system";
import { LS_GUEST_USER_ADDRESS } from "../../../../constants/keys-local-storage.constants";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectOrderType, selectSelectedAddressId, selectShowDateTimeSelect, selectWantAt, updateShowDateTimeSelect, updateWantAt } from "../../../../redux/slices/checkout.slices.redux";
import { selectAddress, selectTimings } from "../../../../redux/slices/index.slices.redux";
import { selectShowAddress, selectShowOrderTypeSelect, updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";
import RestaurantTimingUtils from "../../../../utils/restaurant-timings.utils";
import AddressAdd from "../../common/addresses/address-add.common.templateOne.components";
import OrderTypeManager from "../../common/orderType/order-type-manager.menu.pages.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutText, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import CheckoutDateTime from "./date-time-selector.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

const timings = new RestaurantTimingUtils();

const CheckoutPageSummary: FunctionComponent = ({}) => {
  const orderType = useAppSelector(selectOrderType)
  const wantAtData = useAppSelector(selectWantAt)
  const addressData = useAppSelector(selectAddress);
  const timingsData = useAppSelector(selectTimings);
  const showAddAddress = useAppSelector(selectShowAddress)
  const checkoutAddressId = useAppSelector(selectSelectedAddressId)
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect)
  const showDateTimeSelect = useAppSelector(selectShowDateTimeSelect)
  const dispatch = useAppDispatch()

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
  }, [ orderType ])

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>SUMMARY</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <EditContainer>
          <StyledCheckoutText>{orderType}</StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowOrderTypeSelect(true))} />
        </EditContainer>
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

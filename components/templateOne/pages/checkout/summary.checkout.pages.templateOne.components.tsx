import React, { FunctionComponent } from "react";
import { Row, Col } from "react-grid-system";
import { LS_GUEST_USER_ADDRESS } from "../../../../constants/keys-local-storage.constants";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectOrderType, selectSelectedAddressId, selectShowDateTimeSelect, selectWantAt, updateShowDateTimeSelect } from "../../../../redux/slices/checkout.slices.redux";
import { selectShowAddress, selectShowOrderTypeSelect, updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";
import AddressAdd from "../../common/addresses/address-add.common.templateOne.components";
import OrderTypeManager from "../../common/orderType/order-type-manager.menu.pages.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutText, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import CheckoutDateTime from "./date-time-selector.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

const CheckoutPageSummary: FunctionComponent = ({}) => {
  const orderType = useAppSelector(selectOrderType)
  const wantAtData = useAppSelector(selectWantAt)
  const showAddAddress = useAppSelector(selectShowAddress)
  const checkoutAddressId = useAppSelector(selectSelectedAddressId)
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect)
  const showDateTimeSelect = useAppSelector(selectShowDateTimeSelect)
  const dispatch = useAppDispatch()

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>SUMMARY</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <EditContainer>
          <StyledCheckoutText>{orderType}</StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowOrderTypeSelect(true))} />
        </EditContainer>
        <EditContainer>
          <StyledCheckoutText>{wantAtData?.date.label} ({wantAtData?.time.label})</StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowDateTimeSelect(true))} />
        </EditContainer>
      </Col>
    </Row>
    {((showSelectOrderType || orderType === null) && !showAddAddress) && <OrderTypeManager key="key-ajkndalkwdmalkwmdlkw" />}
    {(showAddAddress
      || (orderType === "DELIVERY" && checkoutAddressId === null
      && orderType === "DELIVERY" && window.localStorage.getItem(LS_GUEST_USER_ADDRESS) === undefined)) && <AddressAdd />}
    {showDateTimeSelect && <CheckoutDateTime />}
  </StyledCheckoutCard>
}

export default CheckoutPageSummary

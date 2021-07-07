import React, { FunctionComponent } from "react";
import { Row, Col } from "react-grid-system";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectOrderType, selectShowDateTimeSelect, selectWantAt, updateShowDateTimeSelect } from "../../../../redux/slices/checkout.slices.redux";
import { selectShowOrderTypeSelect, updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";
import OrderTypeManager from "../../common/orderType/order-type-manager.menu.pages.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutText, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import CheckoutDateTime from "./date-time-selector.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

const CheckoutPageSummary: FunctionComponent = ({}) => {
  const orderTypeData = useAppSelector(selectOrderType)
  const wantAtData = useAppSelector(selectWantAt)
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect)
  const showDateTimeSelect = useAppSelector(selectShowDateTimeSelect)
  const dispatch = useAppDispatch()

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>SUMMARY</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <EditContainer>
          <StyledCheckoutText>{orderTypeData}</StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowOrderTypeSelect(true))} />
        </EditContainer>
        <EditContainer>
          <StyledCheckoutText>{wantAtData?.date.label} ({wantAtData?.time.label})</StyledCheckoutText>
          <EditButton onClick={() => dispatch(updateShowDateTimeSelect(true))} />
        </EditContainer>
      </Col>
    </Row>
    {(showSelectOrderType || orderTypeData === null) && <OrderTypeManager key="key-awdiokajdwma" />}
    {showDateTimeSelect && <CheckoutDateTime />}
  </StyledCheckoutCard>
}

export default CheckoutPageSummary

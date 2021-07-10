import React, { FunctionComponent } from "react";
import { useState } from "react";
import { Row, Col } from "react-grid-system";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectComment, updateComment } from "../../../../redux/slices/checkout.slices.redux";
import { StyledCheckoutCard, StyledCheckoutInput, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

const CheckoutPagePromoCode: FunctionComponent = ({}) => {
  const [ editing, setEditing ] = useState(false)
  const comment = useAppSelector(selectComment)
  const dispatch = useAppDispatch()

  return <StyledCheckoutCard>
    <EditContainer>
      <StyledCheckoutTitle>PROMO CODE</StyledCheckoutTitle>
      <EditButton onClick={() => setEditing(!editing)} />
    </EditContainer>
    <Row>
      <Col xs={12}>
        {editing? <StyledCheckoutInput value={comment} onChange={e => dispatch(updateComment(e.target.value))} />: <p>{comment}</p>}
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPagePromoCode
import React, { FunctionComponent } from "react";
import { useState } from "react";
import { Row, Col } from "react-grid-system";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectComment, updateComment } from "../../../../redux/slices/checkout.slices.redux";
import { StyledCheckoutCard, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

export const StyledCheckoutTextarea = styled.textarea`
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  font-family: inherit;
  font-size: inherit;
  height: 160px;
`

const CheckoutPageComments: FunctionComponent = ({}) => {
  const [ editing, setEditing ] = useState(false)
  const comment = useAppSelector(selectComment)
  const dispatch = useAppDispatch()

  return <StyledCheckoutCard>
    <EditContainer>
      <StyledCheckoutTitle>COMMENTS</StyledCheckoutTitle>
      <EditButton onClick={() => setEditing(!editing)} />
    </EditContainer>
    <Row>
      <Col xs={12}>
        {editing? <StyledCheckoutTextarea value={comment} onChange={e => dispatch(updateComment(e.target.value))} />: <p>{comment}</p>}
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPageComments
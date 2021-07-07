import React, { FunctionComponent } from "react";
import { useState } from "react";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCustomer, updateCustomerEmail, updateCustomerName } from "../../../../redux/slices/user.slices.redux";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";


export const StyledCheckoutCard = styled.div`
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  margin: ${props => props.theme.dimen.X4}px 0;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
`

export const StyledCheckoutTitle = styled.h3`
  margin: 0;
  padding-bottom: ${props => props.theme.dimen.X4}px;
`

export const StyledCheckoutInput = styled.input`
  flex: 2;
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
`

export const StyledCheckoutText = styled.p`
  flex: 2;
  width: 100%;
  padding: ${props => props.theme.dimen.X4}px 0;
  margin: 0;
`

const Text = styled.p`
  flex: 1;
`

const CheckoutPageCustomerInfo: FunctionComponent = ({}) => {
  const userData = useAppSelector(selectCustomer)
  const [ editableName, setEditableName ] = useState(false)
  const [ editableEmail, setEditableEmail ] = useState(false)
  const dispatch = useAppDispatch()

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>How can we reach you?</StyledCheckoutTitle>
    <EditContainer>
      <Text>Name</Text>
      {editableName || !userData.name? (
        <StyledCheckoutInput
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={e => dispatch(updateCustomerName(e.target.value))}
        />
      ): (
        <StyledCheckoutText>{userData.name}</StyledCheckoutText>
      )}
      <EditButton onClick={() => setEditableName(!editableName)} />
    </EditContainer>
    <EditContainer>
      <Text>Email</Text>
      {editableEmail || !userData.email? (
        <StyledCheckoutInput
          type="text"
          placeholder="Email"
          value={userData.email || ""}
          onChange={e => dispatch(updateCustomerEmail(e.target.value))}
        />
      ): (
        <StyledCheckoutText>{userData.email}</StyledCheckoutText>
      )}
      <EditButton onClick={() => setEditableEmail(!editableEmail)} />
    </EditContainer>
    <EditContainer>
      <Text>Phone</Text>
      <StyledCheckoutText>+{userData.country_code} {userData.phone}</StyledCheckoutText>
      <EditButton disabled={true} />
    </EditContainer>
  </StyledCheckoutCard>
}

export default CheckoutPageCustomerInfo

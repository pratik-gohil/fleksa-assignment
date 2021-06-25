import React, { FunctionComponent } from "react";
import { useState } from "react";

import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectTip, updateTip } from "../../../../redux/slices/checkout.slices.redux";
import { StyledCheckoutCard, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";

const TipOptionsList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0 -8px;
  justify-content: space-evenly;
`

const TipOptionsItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex: 1 1 0px;
  margin: 7px;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  overflow: hidden;
  ${props => props.isSelected && css`
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  `}
  p {
    display: flex;
    flex: 1;
    margin: 0;
    justify-content: center;
    cursor: pointer;
    padding: ${props => props.theme.dimen.X4}px;
  }

  span {
    padding: ${props => props.theme.dimen.X4}px 0 ${props => props.theme.dimen.X4}px ${props => props.theme.dimen.X4}px;
  }

  input {
    display: flex;
    flex: 1;
    font-size: inherit;
    border: none;
    outline: none;
    overflow: hidden;
  }
`

const CheckoutPageTip: FunctionComponent = ({}) => {
  const tipData = useAppSelector(selectTip)
  const cartData = useAppSelector(selectCart)
  const dispach = useAppDispatch()
  const [ otherTip, setOtherTip ] = useState(false)

  const tipOptions = [5, 10, 20].map(percent => Math.floor((cartData.cartCost * percent) / 100))

  function onChangeTip(amount: number|null) {
    dispach(updateTip(amount))
  }

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>TIP</StyledCheckoutTitle>
    <TipOptionsList>
      {tipOptions.map((amount, index) => {
        const isSelected = amount === tipData
        return <TipOptionsItem key={index} isSelected={isSelected} onClick={() => {
          setOtherTip(false)
          onChangeTip(isSelected? null: amount)
          }}>
          <p>€{amount}</p>
        </TipOptionsItem>
      })}
      <TipOptionsItem key="custom" isSelected={otherTip}>
        {otherTip? <>
          <span>€</span>
          <input autoFocus type="number" value={tipData || ""} onChange={e => onChangeTip(e.target.value? Number(e.target.value): null)} />
        </>: <>
          <p onClick={() => !otherTip && setOtherTip(true)}>Other</p>
        </>}
      </TipOptionsItem>
    </TipOptionsList>
  </StyledCheckoutCard>
}

export default CheckoutPageTip

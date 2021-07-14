import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import PyApiHttpPostOffers from "../../../../http/pyapi/offers/post.offers.pyapi.http";
import { IMakeOrderProducts } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectOrderType, selectPromoCode, selectTip, updatePromoCode } from "../../../../redux/slices/checkout.slices.redux";
import { updateError } from "../../../../redux/slices/common.slices.redux";
import { selectConfiguration, selectLanguage, selectSelectedMenu } from "../../../../redux/slices/configuration.slices.redux";
import { selectBearerToken } from "../../../../redux/slices/user.slices.redux";
import { checkoutFinalAmount } from "../../../../utils/checkout.utils";
import { getPrductsFromCartData } from "../../../../utils/products.utils";
import { StyledCheckoutCard, StyledCheckoutInput, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import EditButton from "./edit-button.checkout.pages.templateOne.components";
import EditContainer from "./edit-container.checkout.pages.templateOne.components";

import SvgTag from "../../../../public/assets/svg/tag.svg"
import SvgCross from "../../../../public/assets/svg/cross.svg"

const ApplyButton = styled.div`
  padding: ${props => props.theme.dimen.X2}px ${props => props.theme.dimen.X4*2}px;
  margin-left: ${props => props.theme.dimen.X4}px;
  background: #777;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
`

const AppliedPromoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  svg {
    display: block;
  }
  .svg-tag-yellow {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.primaryColor};
  }
`

const RemovePromo = styled.div`
  padding: 10px;
  cursor: pointer;
  border: ${props => props.theme.border};
  border-radius: 100px;
  svg {
    width: 14px;
    height: 14px;
  }
`

const TextSaved = styled.p`
  display: flex;
  flex: 1;
  margin-left: 12px;
`

const CheckoutPagePromoCode: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const cartData = useAppSelector(selectCart)
  const bearerToken = useAppSelector(selectBearerToken)
  const configuration = useAppSelector(selectConfiguration)
  const orderType = useAppSelector(selectOrderType)
  const shopId = useAppSelector(selectSelectedMenu)
  const tipData = useAppSelector(selectTip)
  const promoCodeData = useAppSelector(selectPromoCode)

  const [ editing, setEditing ] = useState(false)
  const [ coupon, setCoupon ] = useState(promoCodeData?.code || "")
  const dispatch = useAppDispatch()

  async function onClickApply() {
    if (orderType && shopId && bearerToken) {
      const products: Array<IMakeOrderProducts> = getPrductsFromCartData(cartData)
      const checkoutFinalAmountWithoutPromo = checkoutFinalAmount(cartData.cartCost, tipData)
      const response = await new PyApiHttpPostOffers(configuration).post({
        products,
        code: coupon,
        orderType: orderType,
        shopId,
        subTotalAmount: checkoutFinalAmountWithoutPromo,
        token: bearerToken
      })
      if (response?.result) {
        dispatch(updatePromoCode({
          code: coupon,
          value: response.details.value,
          token: response.token
        }))
      } else {
        dispatch(updateError({
          show: true,
          message: response?.message[language],
          severity: 'error',
        }))
      }
    }
  }

  useEffect(() => {
    if (promoCodeData) {
      onClickApply()
    }
  }, [ ])

  return <StyledCheckoutCard>
    <EditContainer>
      <StyledCheckoutTitle>PROMO CODE</StyledCheckoutTitle>
      {!promoCodeData && <EditButton onClick={() => setEditing(!editing)} />}
    </EditContainer>
    <Row>
      <Col xs={12}>
        {editing? <EditContainer>
          {promoCodeData? <AppliedPromoContainer>
            <SvgTag className="svg-tag-yellow" />
            <TextSaved>YAY! You saved <strong style={{ marginLeft: 4 }}>€{promoCodeData.value}</strong></TextSaved>
            <RemovePromo onClick={() => dispatch(updatePromoCode(null))}>
              <SvgCross />
            </RemovePromo>
          </AppliedPromoContainer>: <>
            <StyledCheckoutInput value={coupon} onChange={e => setCoupon(e.target.value)} />
            <ApplyButton onClick={onClickApply}>APPLY</ApplyButton>
          </>}
        </EditContainer>: <></>}
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPagePromoCode
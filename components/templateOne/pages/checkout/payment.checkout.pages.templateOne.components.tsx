import { useRouter } from "next/dist/client/router";
import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-grid-system";

import "react-phone-input-2/lib/material.css"
import styled from "styled-components";
import NodeApiHttpPostOrder from "../../../../http/nodeapi/order/post.order.nodeapi.http";
import { IMakeOrderProducts } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectPaymentMethod, updatePaymentMethod } from "../../../../redux/slices/checkout.slices.redux";
import { selectConfiguration } from "../../../../redux/slices/configuration.slices.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { selectBearerToken, selectCustomer } from "../../../../redux/slices/user.slices.redux";
import LoadingIndicator from "../../common/loadingIndicator/loading-indicator.common.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";


const PaymentMethodList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0 -${props => props.theme.dimen.X4}px;
`

const PaymentMethodItems = styled.li`
  display: flex;
  flex: 1;
  margin: ${props => props.theme.dimen.X4}px;
  padding: ${props => props.theme.dimen.X4}px;
  border: ${props => props.theme.border};
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius}px;
  cursor: pointer;
`

const Disclaimer = styled.p`
  margin: 0;
  padding: ${props => props.theme.dimen.X4}px 0;
  text-align: center;
  color: #aaa;
  font-size: 14px;
`

const OrderButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin: 0 -${props => props.theme.dimen.X4}px -${props => props.theme.dimen.X4}px;
  background-color: ${props => props.theme.primaryColor};
  cursor: pointer;
`

const OrderButton = styled.div`
  font-size: 24px;
  font-weight: 700;
`

const CheckoutPagePayment: FunctionComponent = ({}) => {
  const router = useRouter()
  const [ orderButtonLoading, setOrderButtonLoading ] = useState(false)
  const paymentMethodData = useAppSelector(selectPaymentMethod)
  const bearerToken = useAppSelector(selectBearerToken)
  const customerData = useAppSelector(selectCustomer)
  const configuration = useAppSelector(selectConfiguration)
  const shopData = useAppSelector(selectShop)
  const cartData = useAppSelector(selectCart)
  const dispach = useAppDispatch()

  useEffect(() => {
    dispach(updatePaymentMethod("CASH"))
  }, [ ])

  function onClickOrderButton() {
    if (orderButtonLoading) return
    setOrderButtonLoading(true)
    if (bearerToken && shopData?.id && customerData.email && customerData.phone && customerData.country_code) {

      try {
        const products: Array<IMakeOrderProducts> = Object.keys(cartData.items).map(key => {
          const prod = cartData.items[key]
          const hasChoice = prod.choice? prod.choice?.length > 0: false
          const choice = prod.choice? prod.choice.map(choice => ({
            top_index: choice.top_index,
            product_index: choice.product_index
          })): null
          const hasSides = prod.sideProducts? prod.sideProducts.length > 0: false
          const sideProducts = prod.sideProducts? prod.sideProducts.map(side => ({ id: side.id })): null
          return {
            id: prod.id,
            quantity: prod.quantity,
            main_name: prod.mainName,
            has_choice: hasChoice,
            choice: hasChoice? choice: null,
            has_sides: hasSides,
            side_product_json: hasSides? sideProducts: null,
            type: prod.type === "SINGLE"? "SINGLE": "PART"
          }
        })
  
        const response = new NodeApiHttpPostOrder(configuration, bearerToken).post({
          order: {
            shop_id: shopData?.id,
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            country_code: customerData.country_code,
            is_delivery: false,
            customer_address_id: undefined,
            want_at: new Date().toString(),
            products,
            payment_method: paymentMethodData,
            tip: undefined,
            discount_token: "",
            coupon_token: "",
            description: "",
            order_type: "PICKUP"
          }
        })
        console.log(response)
        router.push("/order-placed")
      } catch (error) {
        console.error(error)
      } finally {
        setOrderButtonLoading(false)
      }
    }
  }

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>PAYMENT ({paymentMethodData})</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <PaymentMethodList>
          <PaymentMethodItems onClick={() => dispach(updatePaymentMethod("CASH"))}>CASH</PaymentMethodItems>
          <PaymentMethodItems onClick={() => dispach(updatePaymentMethod("CARD"))}>CARD</PaymentMethodItems>
          <PaymentMethodItems onClick={() => dispach(updatePaymentMethod("PAYPAL"))}>PAYPAL</PaymentMethodItems>
        </PaymentMethodList>
      </Col>
      <Col xs={12}>
        <Disclaimer>By clicking on ORDER AND PAY you agree with the contents of the shopping cart, the data you filled out, our Privacy Policy and Terms of use.</Disclaimer>
      </Col>
      <Col xs={12}>
        <OrderButtonContainer onClick={onClickOrderButton}>
          {orderButtonLoading? (
            <LoadingIndicator />
          ): (
            <OrderButton>ORDER AND PAY</OrderButton>
          )}
        </OrderButtonContainer>
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPagePayment

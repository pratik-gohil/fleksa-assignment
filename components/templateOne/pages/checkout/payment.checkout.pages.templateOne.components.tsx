import { useRouter } from "next/dist/client/router";
import React, { FunctionComponent } from "react";
import { useState } from "react";
import { Row, Col } from "react-grid-system";
import { PayPalButtons } from "@paypal/react-paypal-js";

import styled, { css } from "styled-components";
import NodeApiHttpPostOrder from "../../../../http/nodeapi/order/post.order.nodeapi.http";
import { IMakeOrderProducts } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectPaymentMethod, updatePaymentMethod, ICheckoutPaymentMethods, selectTip } from "../../../../redux/slices/checkout.slices.redux";
import { selectConfiguration } from "../../../../redux/slices/configuration.slices.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { selectBearerToken, selectCustomer } from "../../../../redux/slices/user.slices.redux";
import LoadingIndicator from "../../common/loadingIndicator/loading-indicator.common.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import { checkoutFinalAmount } from "../../../../utils/checkout.utils";


const PaymentMethodList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0 -${props => props.theme.dimen.X4}px;
`

const PaymentMethodItems = styled.li<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  margin: ${props => props.theme.dimen.X4}px;
  padding: ${props => props.theme.dimen.X4}px;
  border: ${props => props.theme.border};
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius}px;
  ${props => props.isActive && css`
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  `}
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
  height: 70px;
  margin-top: ${props => props.theme.dimen.X4}px;
`

const OrderButtonCashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${props => props.theme.primaryColor};
  cursor: pointer;
  border: ${props => props.theme.border};
  border-radius: 1000px;
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
  const tipData = useAppSelector(selectTip)
  const dispach = useAppDispatch()

  async function createOrder() {
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
        return response
      } catch (error) {
        throw error
      }
    }
  }

  async function onClickCashOrderButton() {
    try {
      if (orderButtonLoading) return
      setOrderButtonLoading(true)
      await createOrder()
      router.push("/order-placed")
    } catch (error) {
      console.error(error)
    } finally {
      setOrderButtonLoading(false)
    }
  }

  let orderButton
  switch (paymentMethodData) {
    case "CASH":
      orderButton = <OrderButtonCashContainer onClick={onClickCashOrderButton}>
        {orderButtonLoading? <LoadingIndicator />: <OrderButton>ORDER AND PAY</OrderButton>}
      </OrderButtonCashContainer>
      break;
    case "CARD":

      break;
    case "PAYPAL":
      orderButton = <PayPalButtons fundingSource="paypal" style={{
        label: "pay",
        shape: "pill",
        color: "black",
        layout: "vertical",
        tagline: false
      }} createOrder={async (_, actions) => {
        return await actions.order.create({
          purchase_units: [{
            amount: {
              value: checkoutFinalAmount(cartData.cartCost, tipData).toFixed(2)
            }
          }],
          application_context: {
            shipping_preference: "NO_SHIPPING"
          }
        })
      }} onApprove={async (_, actions) => {
        const details = await actions.order.capture()
        console.log(details)
      }} />
      break;
    default:
      break;
  }

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>PAYMENT ({paymentMethodData})</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <PaymentMethodList>
          {(["CASH", "CARD", "PAYPAL"] as Array<ICheckoutPaymentMethods>).map(method => {
            return <PaymentMethodItems
              isActive={paymentMethodData === method}
              onClick={() => dispach(updatePaymentMethod(method))}
            >{method}</PaymentMethodItems>
          })}
        </PaymentMethodList>
      </Col>
      <Col xs={12}>
        <Disclaimer>By clicking on ORDER AND PAY you agree with the contents of the shopping cart, the data you filled out, our Privacy Policy and Terms of use.</Disclaimer>
      </Col>
      <Col xs={12}>
        <OrderButtonContainer>
          {orderButton}
        </OrderButtonContainer>
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPagePayment

import moment from "moment";
import { useRouter } from "next/dist/client/router";
import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-grid-system";

import styled, { css } from "styled-components";
import NodeApiHttpPostOrder from "../../../../http/nodeapi/order/post.order.nodeapi.http";
import { IMakeOrderProducts } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectPaymentMethod, updatePaymentMethod, ICheckoutPaymentMethods, selectTip, selectComment, selectOrderType, ICheckoutOrderTypes, selectWantAt, selectSelectedAddressId, selectPromoCode } from "../../../../redux/slices/checkout.slices.redux";
import { selectConfiguration, selectSelectedMenu } from "../../../../redux/slices/configuration.slices.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { selectBearerToken, selectCustomer } from "../../../../redux/slices/user.slices.redux";
import { getPrductsFromCartData } from "../../../../utils/products.utils";
import LoadingIndicator from "../../common/loadingIndicator/loading-indicator.common.templateOne.components";
import { StyledCheckoutCard, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";
import CheckoutPageOrderButtonPaypal from "./order-button-paypal.checkout.pages.templateOne.components";
import CheckoutPageOrderButtonStripe from "./order-button-stripe.checkout.pages.templateOne.components";

import SvgCash from "../../../../public/assets/svg/cash.svg"
import SvgCard from "../../../../public/assets/svg/card.svg"
import SvgPaypal from "../../../../public/assets/svg/paypal.svg"


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
  ${props => props.isActive? css`
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  `: css`
    box-shadow: 0 0 4px 0 transparent;
  `}
  cursor: pointer;
  svg {
    display: block;
    height: 40px;
  }
`

const Disclaimer = styled.p`
  margin: 0;
  padding: ${props => props.theme.dimen.X4}px 0;
  text-align: center;
  color: #aaa;
  font-size: 12px;
`

const OrderButtonContainer = styled.div`
  margin-top: ${props => props.theme.dimen.X4}px;
`

const OrderButtonCashContainer = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: ${props => props.active? props.theme.primaryColor: "#aaa"};
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
  const [ orderCanBePlaced, setOrderCanBePlaced ] = useState(false)
  const paymentMethodData = useAppSelector(selectPaymentMethod)
  const addressId = useAppSelector(selectSelectedAddressId)
  const shopMenuId = useAppSelector(selectSelectedMenu)
  const configuration = useAppSelector(selectConfiguration)
  const bearerToken = useAppSelector(selectBearerToken)
  const customerData = useAppSelector(selectCustomer)
  const promoCode = useAppSelector(selectPromoCode)
  const orderType = useAppSelector(selectOrderType)
  const wantAtData = useAppSelector(selectWantAt)
  const comment = useAppSelector(selectComment)
  const shopData = useAppSelector(selectShop)
  const cartData = useAppSelector(selectCart)
  const tipData = useAppSelector(selectTip)
  const dispatch = useAppDispatch()

  async function createOrder() {
    try {
      const products: Array<IMakeOrderProducts> = getPrductsFromCartData(cartData)

      const response = await new NodeApiHttpPostOrder(configuration, bearerToken as any).post({
        order: {
          shop_id: shopMenuId as number,
          name: customerData.name,
          email: customerData.email as any,
          phone: customerData.phone as any,
          country_code: customerData.country_code as any,
          is_delivery: orderType === "DELIVERY",
          customer_address_id: addressId || undefined,
          want_at: moment(`${wantAtData?.date.value as string} ${wantAtData?.time.value as string}`).toString(),
          products,
          payment_method: paymentMethodData,
          tip: tipData? tipData: undefined,
          offer: {
            is_applicable: promoCode !== null,
            token: promoCode?.token || "",
          },
          description: comment,
          order_type: orderType as ICheckoutOrderTypes,
        }
      })
      return response
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const canPlace = !!(bearerToken
      && shopData?.id
      && customerData.name
      && customerData.name.length
      && customerData.email
      && customerData.email.length
      && customerData.phone
      && customerData.email_verified
      && customerData.country_code
      && wantAtData
    )
    setOrderCanBePlaced(canPlace)
  }, [
    bearerToken,
    shopData?.id,
    customerData.name,
    customerData.email,
    customerData.email_verified,
    customerData.phone,
    customerData.country_code,
    wantAtData
  ])

  async function onPaymentDone() {
    router.push("/order-placed")
  }

  async function onClickCashOrderButton() {
    try {
      if (orderButtonLoading || !orderCanBePlaced) return
      setOrderButtonLoading(true)
      await createOrder()
      await onPaymentDone()
    } catch (error) {
      console.error(error)
    } finally {
      setOrderButtonLoading(false)
    }
  }

  let paymentTitle: string|undefined = undefined
  let orderButton
  switch (paymentMethodData) {
    case "CASH":
      orderButton = <OrderButtonCashContainer onClick={onClickCashOrderButton} active={orderCanBePlaced}>
        {orderButtonLoading? <LoadingIndicator />: <OrderButton>ORDER AND PAY</OrderButton>}
      </OrderButtonCashContainer>
      paymentTitle = paymentMethodData
      break;
    case "STRIPE":
      orderButton = <CheckoutPageOrderButtonStripe onPaymentDone={onPaymentDone} createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />
      paymentTitle = "CREDIT CARD"
      break;
    case "PAYPAL":
      orderButton = <CheckoutPageOrderButtonPaypal onPaymentDone={onPaymentDone} createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />
      paymentTitle = paymentMethodData
      break;
    default:
      break;
  }

  return <StyledCheckoutCard style={{ marginBottom: 48 }}>
    <StyledCheckoutTitle>PAYMENT {paymentTitle? `(${paymentTitle})`: ""}</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <PaymentMethodList>
          {[{
            method: "CASH" as ICheckoutPaymentMethods,
            icon: SvgCash
          }, {
            method: "STRIPE" as ICheckoutPaymentMethods,
            icon: SvgCard
          }, {
            method: "PAYPAL" as ICheckoutPaymentMethods,
            icon: SvgPaypal
          }].map(item => {
            const isActive = paymentMethodData === item.method
            return <PaymentMethodItems
              key={item.method}
              isActive={isActive}
              onClick={() => dispatch(updatePaymentMethod(item.method))}
            ><item.icon /></PaymentMethodItems>
          })}
        </PaymentMethodList>
      </Col>
      <Col xs={12}>
        <OrderButtonContainer>
          {orderButton}
        </OrderButtonContainer>
      </Col>
      <Col xs={12}>
        <Disclaimer>By clicking on ORDER AND PAY you agree with the contents of the shopping cart, the data you filled out, our Privacy Policy and Terms of use.</Disclaimer>
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPagePayment

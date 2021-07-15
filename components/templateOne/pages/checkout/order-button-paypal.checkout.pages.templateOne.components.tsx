import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { FunctionComponent } from "react";
import NodeApiHttpPostPaypal from "../../../../http/nodeapi/paypal/post.paypal.nodeapi.http";
import { INodeApiHttpPostOrderResponse, IOrderResponsePaypal } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectConfiguration } from "../../../../redux/slices/configuration.slices.redux";
import { selectBearerToken } from "../../../../redux/slices/user.slices.redux";

export interface IPropsCheckoutPageOrderButtonPaypal {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>
  orderCanBePlaced: boolean
  onPaymentDone(): Promise<void>
}

const CheckoutPageOrderButtonPaypal: FunctionComponent<IPropsCheckoutPageOrderButtonPaypal> = ({ onPaymentDone, createOrder, orderCanBePlaced }) => {
  const bearerToken = useAppSelector(selectBearerToken)
  const configuration = useAppSelector(selectConfiguration)

  return <PayPalButtons fundingSource="paypal" style={{
    label: "pay",
    shape: "pill",
    color: "black",
    layout: "vertical",
    tagline: false
  }} disabled={!orderCanBePlaced} createOrder={async () => {
    const response = await createOrder() as IOrderResponsePaypal
    return response.paypal_order_id
  }} onApprove={async (data) => {
    if (bearerToken) {
      await new NodeApiHttpPostPaypal(configuration, bearerToken).postOrderSuccess({
        paypalOrderId: data.orderID
      })
      await onPaymentDone()
    }
  }} />
}

export default CheckoutPageOrderButtonPaypal

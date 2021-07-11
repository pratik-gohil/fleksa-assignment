import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import { IGuestAddress } from "../../components/templateOne/common/addresses/address-add.common.templateOne.components";

import CheckoutPageCart from "../../components/templateOne/pages/checkout/cart.checkout.pages.templateOne.components";
import CheckoutPageComments from "../../components/templateOne/pages/checkout/comments.checkout.pages.templateOne.components";
import CheckoutPageCustomerInfo from "../../components/templateOne/pages/checkout/customer-info.checkout.pages.templateOne.components";
import CheckoutPagePayment from "../../components/templateOne/pages/checkout/payment.checkout.pages.templateOne.components";
import CheckoutPagePromoCode from "../../components/templateOne/pages/checkout/promo-code.checkout.pages.templateOne.components";
import CheckoutPageSummary from "../../components/templateOne/pages/checkout/summary.checkout.pages.templateOne.components";
import CheckoutPageTip from "../../components/templateOne/pages/checkout/tip.checkout.pahes.templateOne.components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { LS_GUEST_USER_ADDRESS } from "../../constants/keys-local-storage.constants";
import NodeApiHttpPostCreateNewAddressRequest from "../../http/nodeapi/account/post.create-address.nodeapi.http";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.redux";
import { updateSelectedAddressId } from "../../redux/slices/checkout.slices.redux";
import { updateError } from "../../redux/slices/common.slices.redux";
import { selectConfiguration } from "../../redux/slices/configuration.slices.redux";
import { selectBearerToken, updateNewCustomerAddress } from "../../redux/slices/user.slices.redux";


const CartContainerLarge = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const CartContainerSmall = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const CheckoutPageTemplateOne: FunctionComponent = ({}) => {
  const dispatch = useAppDispatch()
  const configuration = useAppSelector(selectConfiguration)
  const bearerToken = useAppSelector(selectBearerToken)

  async function addGuestAddressOnServerIfExists() {
    // check if guest address exists. If it does add it to server
    const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS)
    if (guestAddressString && bearerToken) {
      const guestAddress = JSON.parse(guestAddressString) as IGuestAddress
      const response = await new NodeApiHttpPostCreateNewAddressRequest(configuration, bearerToken).post({
        floor: guestAddress.floor,
        address: guestAddress.address,
        address_type: guestAddress.address_type,
        city: guestAddress.city,
        postal_code: guestAddress.postal_code,
      })
      if (!response.result) {
        dispatch(
          updateError({
            show: true,
            message: response.message,
            severity: 'error',
          }),
        );
        return;
      }
      window.localStorage.removeItem(LS_GUEST_USER_ADDRESS)
      dispatch(updateNewCustomerAddress(response.data?.address));
      dispatch(updateSelectedAddressId(response.data?.address.id))
    }
  }

  useEffect(() => {
    if (window !== "undefined") {
      addGuestAddressOnServerIfExists()
    }
  }, [ ])

  return <PayPalScriptProvider options={{
    debug: false,
    "client-id": "sb",
    currency: "EUR",
  }}>
    <Container>
      <Row>
        <Col lg={6}>
          <CartContainerSmall>
            <CheckoutPageCart />
          </CartContainerSmall>
          <CheckoutPageCustomerInfo />
          <CheckoutPageSummary />
          <CheckoutPageComments />
          <CheckoutPagePromoCode />
          <CheckoutPageTip />
          <CheckoutPagePayment />
        </Col>
        <Col lg={6}>
          <CartContainerLarge>
            <CheckoutPageCart />
          </CartContainerLarge>
        </Col>
      </Row>
    </Container>
  </PayPalScriptProvider>
}

export default CheckoutPageTemplateOne

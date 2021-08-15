import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
// import { IGuestAddress } from '../../components/templateOne/common/addresses/address-add.common.templateOne.components';

import CheckoutPageCart from '../../components/templateOne/pages/checkout/cart.checkout.pages.templateOne.components';
import CheckoutPageComments from '../../components/templateOne/pages/checkout/comments.checkout.pages.templateOne.components';
import CheckoutPageCustomerInfo from '../../components/templateOne/pages/checkout/customer-info.checkout.pages.templateOne.components';
import CheckoutPagePayment from '../../components/templateOne/pages/checkout/payment.checkout.pages.templateOne.components';
import CheckoutPagePromoCode from '../../components/templateOne/pages/checkout/promo-code.checkout.pages.templateOne.components';
import CheckoutPageSummary from '../../components/templateOne/pages/checkout/summary.checkout.pages.templateOne.components';
import CheckoutPageTip from '../../components/templateOne/pages/checkout/tip.checkout.pahes.templateOne.components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
// import { LS_GUEST_USER_ADDRESS } from '../../constants/keys-local-storage.constants';
// import PyApiHttpPostAddress from '../../http/pyapi/address/post.address.pyapi.http';
// import { IParticularAddress } from '../../interfaces/common/customer.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.redux';
import { selectPaymentMethod, updatePaymentMethod } from '../../redux/slices/checkout.slices.redux';
// import { updateError } from '../../redux/slices/common.slices.redux';
// import { selectConfiguration, selectSelectedMenu } from '../../redux/slices/configuration.slices.redux';
import { selectShop } from '../../redux/slices/index.slices.redux';
// import { selectAddressByType, selectBearerToken, updateNewCustomerAddress } from '../../redux/slices/user.slices.redux';

const CartContainerLarge = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`;

const CartContainerSmall = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`;

const CheckoutPageTemplateOne: FunctionComponent = ({}) => {
  const dispatch = useAppDispatch();
  // const configuration = useAppSelector(selectConfiguration);
  // const bearerToken = useAppSelector(selectBearerToken);
  // const shopId = useAppSelector(selectSelectedMenu);
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const shopData = useAppSelector(selectShop);
  // const addressByType = useAppSelector((state) => selectAddressByType(state, 'HOME'));

  // async function addGuestAddressOnServerIfExists() {
  //   // check if guest address exists. If it does add it to server
  //   const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS);
  //   if (guestAddressString && bearerToken && shopId) {
  //     const guestAddress = JSON.parse(guestAddressString) as IGuestAddress;
  //     const response = await new PyApiHttpPostAddress(configuration).postAll({
  //       floor: '',
  //       shopId: shopId,
  //       address: guestAddress.address,
  //       addressType: guestAddress.address_type,
  //       city: guestAddress.city,
  //       postalCode: guestAddress.postal_code,
  //       area: '',
  //       token: bearerToken,
  //     });
  //     console.log(response);
  //     if (response) {
  //       if (!response.result) {
  //         dispatch(
  //           updateError({
  //             show: true,
  //             message: response.description,
  //             severity: 'error',
  //           }),
  //         );
  //         return;
  //       }
  //       if (response.customer.is_customer && response.customer.details?.customer_address_id) {
  //         window.localStorage.removeItem(LS_GUEST_USER_ADDRESS);
  //         const addressAdded: IParticularAddress = {
  //           id: response.customer.details.customer_address_id,
  //           address_type: guestAddress.address_type,
  //           floor: guestAddress.floor,
  //           address: guestAddress.address,
  //           country: '',
  //           postal_code: guestAddress.postal_code,
  //           city: guestAddress.city,
  //           state: '',
  //         };
  //         dispatch(updateNewCustomerAddress(addressAdded));
  //         dispatch(updateSelectedAddressId(response.customer.details.customer_address_id));
  //       } else {
  //         dispatch(updateSelectedAddressId(addressByType?.id));
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    if (window !== 'undefined') {
      // addGuestAddressOnServerIfExists();

      if ((paymentMethod === 'PAYPAL' && !shopData?.paypal_available) || (paymentMethod === 'STRIPE' && !shopData?.stripe_available))
        dispatch(updatePaymentMethod('CASH')); // ? Default method on checkout
    }
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        debug: false,
        'client-id': process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_KEY as string,
        currency: 'EUR',
      }}
    >
      <Container>
        <Row>
          <Col lg={7}>
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
          <Col lg={5}>
            <CartContainerLarge>
              <CheckoutPageCart />
            </CartContainerLarge>
          </Col>
        </Row>
      </Container>
    </PayPalScriptProvider>
  );
};

export default CheckoutPageTemplateOne;

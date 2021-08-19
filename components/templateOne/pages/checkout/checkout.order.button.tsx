import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { updateCheckoutLogin } from '../../../../redux/slices/checkout.slices.redux';
import { selectCustomer, selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';

const OrderButton = styled.div<{ active: boolean; isLoggedIn: boolean }>`
  font-size: clamp(16px, 24px, 3vw);
  font-weight: 700;
  background-color: ${(p) => (p.isLoggedIn ? (p.active ? p.theme.primaryColor : '#aaa') : p.theme.primaryColor)};
  display: grid;
  place-items: center;
  border-radius: 1000px;
  border: ${(p) => p.theme.border};
  cursor: pointer;
  min-height: 55px;
  width: 100%;
`;

interface ICheckoutOrderAndPayButtonProps {
  orderCanBePlaced: boolean;
  orderPlaceFunction: () => void | Promise<any>;
  orderButtonLoading: boolean;
}

const CheckoutOrderAndPayButton: FunctionComponent<ICheckoutOrderAndPayButtonProps> = ({
  orderCanBePlaced,
  orderPlaceFunction,
  orderButtonLoading,
}) => {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const customerData = useAppSelector(selectCustomer);

  const { t } = useTranslation('page-checkout');
  const dispatch = useAppDispatch();

  const handleProceedButtonClick = async () => {
    amplitudeEvent(constructEventName(`payment proceed`, 'button'), {
      isLoggedIn,
      orderCanBePlaced,
    });

    if (typeof window !== 'undefined') {
      if (!customerData.name || !customerData.email || !customerData.phone || !customerData.country_code) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        amplitudeEvent(constructEventName(`redirect top`, 'scroll'), {
          customerData,
        });

        return;
      } else
        window.scrollTo({
          top: document.body.scrollHeight + 1000,
          left: 0,
          behavior: 'smooth',
        });
    }

    dispatch(updateCheckoutLogin(true));
  };

  return (
    <OrderButton active={orderCanBePlaced} isLoggedIn={isLoggedIn} onClick={isLoggedIn ? orderPlaceFunction : handleProceedButtonClick}>
      {orderButtonLoading ? <LoadingIndicator width={20} /> : isLoggedIn ? t('@order-and-pay') : t('@proceed')}
    </OrderButton>
  );
};

export default CheckoutOrderAndPayButton;

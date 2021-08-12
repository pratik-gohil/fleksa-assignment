import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCheckoutLogin, updateCheckoutLogin } from '../../../../redux/slices/checkout.slices.redux';
import { selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import CheckoutLoginDropdown from './checkout.login.dropdown';

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
`;

interface ICheckoutOrderAndPayButtonProps {
  orderCanBePlaced: boolean;
  orderPlaceFunction: () => void | Promise<any>;
  shop: IShopAvailablity;
  orderButtonLoading: boolean;
}

const CheckoutOrderAndPayButton: FunctionComponent<ICheckoutOrderAndPayButtonProps> = ({
  orderCanBePlaced,
  orderPlaceFunction,
  shop,
  orderButtonLoading,
}) => {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isCheckoutLogin = useAppSelector(selectCheckoutLogin);

  const { t } = useTranslation('page-checkout');
  const dispatch = useAppDispatch();

  const handleProceedButtonClick = async () => {
    console.log('process button clicked');
    dispatch(updateCheckoutLogin(true));
  };

  return !!isCheckoutLogin ? (
    <CheckoutLoginDropdown />
  ) : (
    <OrderButton active={orderCanBePlaced} isLoggedIn={isLoggedIn} onClick={isLoggedIn ? orderPlaceFunction : handleProceedButtonClick}>
      {orderButtonLoading ? (
        <LoadingIndicator width={20} />
      ) : isLoggedIn ? (
        !shop.availability && !shop.isClosed ? (
          t('@pre-order-and-pay')
        ) : (
          t('@order-and-pay')
        )
      ) : (
        t('@proceed')
      )}
    </OrderButton>
  );
};

export default CheckoutOrderAndPayButton;

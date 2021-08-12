import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCheckoutLogin, updateCheckoutLogin } from '../../../../redux/slices/checkout.slices.redux';
import { selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import CheckoutLoginDropdown from './checkout.login.dropdown';

const OrderMidLevelContainer = styled.div<{ active: boolean; isLoggedIn: boolean; isCheckoutLogin: boolean }>`
  display: ${(p) => (p.isCheckoutLogin ? 'none' : 'grid')};
  place-items: center;
  min-height: 55px;
  background-color: ${(p) => (p.isLoggedIn ? (p.active ? p.theme.primaryColor : '#aaa') : p.theme.primaryColor)};
  cursor: pointer;
  border: ${(p) => p.theme.border};
  border-radius: 1000px;
`;

const OrderButton = styled.div`
  font-size: clamp(16px, 24px, 3vw);
  font-weight: 700;
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
    dispatch(updateCheckoutLogin(true));
  };

  return !!isCheckoutLogin ? (
    <CheckoutLoginDropdown />
  ) : (
    <OrderMidLevelContainer onClick={orderPlaceFunction} active={orderCanBePlaced} isLoggedIn={isLoggedIn} isCheckoutLogin={isCheckoutLogin}>
      {orderButtonLoading ? (
        <LoadingIndicator />
      ) : isLoggedIn ? (
        <OrderButton>{!shop.availability && !shop.isClosed ? t('@pre-order-and-pay') : t('@order-and-pay')}</OrderButton>
      ) : (
        <OrderButton onClick={handleProceedButtonClick}>{t('@proceed')}</OrderButton>
      )}
    </OrderMidLevelContainer>
  );
};

export default CheckoutOrderAndPayButton;

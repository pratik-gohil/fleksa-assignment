import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCheckoutLogin } from '../../../../redux/slices/checkout.slices.redux';
import { selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';

const OrderButtonCashContainer = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: ${(props) => (props.active ? props.theme.primaryColor : '#aaa')};
  cursor: pointer;
  border: ${(props) => props.theme.border};
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

  return !isCheckoutLogin ? (
    <OrderButtonCashContainer onClick={orderPlaceFunction} active={orderCanBePlaced}>
      {orderButtonLoading ? (
        <LoadingIndicator />
      ) : isLoggedIn ? (
        <OrderButton>{!shop.availability && !shop.isClosed ? t('@pre-order-and-pay') : t('@order-and-pay')}</OrderButton>
      ) : (
        <OrderButton>{t('@proceed')}</OrderButton>
      )}
    </OrderButtonCashContainer>
  ) : null;
};

export default CheckoutOrderAndPayButton;

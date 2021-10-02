import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import {
  selectLanguage,
  selectLanguageCode,
  selectSelectedMenu,
  selectShowCart,
} from '../../../../redux/slices/configuration.slices.redux';
import CartAddRemoveButton from './add-remove.cart.common.templateOne.components';
import SvgCartEmpty from '../../../../public/assets/svg/cart-empty.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import formatCurrency from '../../../../utils/formatCurrency';
import { selectDeliveryFinances, selectOrderType } from '../../../../redux/slices/checkout.slices.redux';
import { selectAddress, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { useTranslation } from 'next-i18next';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

const Wrapper = styled.div<{ showCart: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: ${(props) => props.theme.navMobile.height}px;
  flex-direction: column;
  flex: 1;
  background: #fff;
  display: ${(props) => (props.showCart ? 'flex' : 'none')};
  z-index: 1;
  padding: 0 ${(props) => props.theme.dimen.X4}px;
  max-height: 100vh;
  overflow: auto;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    bottom: 0;
    padding: 0;
    margin: 0;
    position: relative;
    display: flex;
    max-height: 600px;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 26px;
  margin: 0 -12px ${(props) => props.theme.dimen.X4}px -12px;
  padding: ${(props) => props.theme.dimen.X4}px;
  background-color: #f9f9f9;
  border-bottom: ${(props) => props.theme.border};
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin: 0;
    background-color: transparent;
  }
`;

const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: ${(props) => props.theme.dimen.X4}px 0;
  span {
    font-size: 12px;
    font-weight: 400;
  }
`;

const ItemTitleAdditional = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-top: -14px;
  margin-left: 10px;
`;

const OrderButton = styled.p<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? '#222' : '#aaa')};
  color: #fff;
  padding: ${(props) => props.theme.dimen.X4}px;
  margin: 0 0 ${(props) => props.theme.dimen.X4}px 0;
  border-radius: ${(props) => props.theme.borderRadius}px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
`;

const Column1 = styled.div`
  flex: 8;
`;

const Column2 = styled.div``;

const Column3 = styled.div`
  flex: 3;
  justify-content: flex-end;
  display: flex;
  flex-shrink: 0;
`;

const Price = styled.p`
  display: flex;
  flex-shrink: 0;
  margin: ${(props) => props.theme.dimen.X4}px 0;
  font-weight: 600;
  text-align: right;
`;

const CartCost = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-top: ${(props) => props.theme.border};
  font-weight: 600;
`;

const CartEmptyContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.theme.dimen.X4 * 2}px;
`;

const TextFeelingHungry = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: ${(props) => props.theme.dimen.X4}px 0 0 0;
`;

const TextChooseDishes = styled(TextFeelingHungry)``;

const MinimumOrderMessage = styled.p`
  font-size: 16px;
  font-weight: 400;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  margin: 0 0 ${(props) => props.theme.dimen.X4}px 0;
`;

const Cart: FunctionComponent = ({}) => {
  const router = useRouter();
  const [cartItemKeys, setCartItemKeys] = useState<Array<string>>([]);
  const showCart = useAppSelector(selectShowCart);
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const shopData = useAppSelector(selectShop);
  const address = useAppSelector(selectAddress);
  const siblings = useAppSelector(selectSiblings);
  const orderType = useAppSelector(selectOrderType);
  const languageCode = useAppSelector(selectLanguageCode);
  const selectedMenuId = useAppSelector(selectSelectedMenu);
  const deliveryFinances = useAppSelector(selectDeliveryFinances);
  const { t } = useTranslation('cart');

  const [orderPossible, setOrderPossible] = useState(false);
  const [noOrderTypeAvailable, setNoOrderTypeAvailable] = useState(true);
  const [addressData, setAddressData] = useState<IAddress | null | undefined>();

  useEffect(() => {
    if (shopData?.id == selectedMenuId) setAddressData(address);
    else setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);
  }, [siblings]);

  useEffect(() => {
    setCartItemKeys(cartData.items ? Object.keys(cartData.items) : []);
  }, [cartData]);

  useEffect(() => {
    let tempIsPossible = false;

    if (addressData?.has_delivery || addressData?.has_pickup || addressData?.has_dinein) setNoOrderTypeAvailable(false);
    else return;

    if (orderType === 'DELIVERY')
      tempIsPossible = deliveryFinances && deliveryFinances.amount ? cartData.cartCost >= deliveryFinances.amount : false;
    else tempIsPossible = cartItemKeys.length > 0;

    setOrderPossible(tempIsPossible);
  }, [cartItemKeys, cartData.cartCost, deliveryFinances?.amount, deliveryFinances?.charges, orderType, addressData]);

  function onClickOrderButton() {
    amplitudeEvent(constructEventName(`${t('@order')}`, 'button'), {});

    if (orderPossible) router.push('/checkout');
  }

  return (
    <Wrapper showCart={showCart}>
      <Title>{t('@your-cart')}</Title>
      <List>
        {cartItemKeys.length > 0 ? (
          <>
            {cartItemKeys.map((key) => {
              const cartItem = cartData.items[key];
              return (
                cartItem && (
                  <ListItem key={key}>
                    <Column1>
                      {cartItem.type === 'MULTIPLE' && (
                        <ItemTitle>
                          {cartItem.mainName[language]} <span>{'(' + cartItem.partName[language] + ')'}</span>
                        </ItemTitle>
                      )}

                      {cartItem.type === 'SINGLE' && <ItemTitle>{cartItem.mainName[language]}</ItemTitle>}

                      {((cartItem.sideProducts && cartItem.sideProducts.length > 0) || (cartItem.choice && cartItem.choice.length > 0)) && (
                        <ItemTitleAdditional>
                          {cartItem.choice?.map((i) => i.name[language]).join(', ')}
                          {cartItem.sideProducts?.map((i) => i.name[language]).join(', ')}
                        </ItemTitleAdditional>
                      )}
                    </Column1>

                    <Column2>
                      <CartAddRemoveButton cartItem={cartItem} />
                    </Column2>

                    <Column3>
                      <Price>{formatCurrency(cartItem.totalCost, languageCode)}</Price>
                    </Column3>
                  </ListItem>
                )
              );
            })}

            <ListItem key="info-cart">
              <CartCost>
                <ItemTitle>{t('@total')}</ItemTitle>
                <Price>{formatCurrency(cartData.cartCost, languageCode)}</Price>
              </CartCost>
            </ListItem>

            {!orderPossible && !noOrderTypeAvailable && (
              <MinimumOrderMessage>
                {t('@min-amount-1')} {deliveryFinances?.amount && formatCurrency(deliveryFinances?.amount, languageCode)}
                {t('@min-amount-2')}
              </MinimumOrderMessage>
            )}
          </>
        ) : (
          <ListItem key="empty-cart">
            <CartEmptyContainer>
              <SvgCartEmpty />
              <TextFeelingHungry>{t('@hungry')}</TextFeelingHungry>
              <TextChooseDishes>{t('@choose')}</TextChooseDishes>
            </CartEmptyContainer>
          </ListItem>
        )}

        {noOrderTypeAvailable && <MinimumOrderMessage>{t('@not-accept')}</MinimumOrderMessage>}
      </List>

      <OrderButton isActive={orderPossible} onClick={onClickOrderButton}>
        {t('@order')}
      </OrderButton>
    </Wrapper>
  );
};

export default Cart;

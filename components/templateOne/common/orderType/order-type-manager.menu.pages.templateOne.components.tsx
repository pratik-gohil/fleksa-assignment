import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import {
  ICheckoutOrderTypes,
  selectOrderType,
  selectSelectedAddressId,
  updateOrderType,
} from '../../../../redux/slices/checkout.slices.redux';
import SvgDelivery from '../../../../public/assets/svg/delivery.svg';
import SvgPickup from '../../../../public/assets/svg/pickup.svg';
import SvgDinein from '../../../../public/assets/svg/dinein.svg';
import {
  selectShowAddress,
  selectShowOrderTypeSelect,
  updateShowAddAddress,
  updateShowOrderTypeSelect,
} from '../../../../redux/slices/menu.slices.redux';
import { selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { useState } from 'react';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { useTranslation } from 'next-i18next';
import { selectAddressById, selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import AddAddressExtendModel from '../addresses/address-add.-extend.common.templateOne.components';
import SvgBackIcon from '../../../../public/assets/svg/account/back-arrow.svg';
import { LS_GUEST_USER_ADDRESS } from '../../../../constants/keys-local-storage.constants';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: ${(props) => props.theme.navMobile.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.dimen.X4}px;
  z-index: 1;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: ${(props) => props.theme.navDesktop.height}px;
    bottom: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 500px;
  max-height: 80%;
  background-color: #fff;
  overflow: auto;
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const Title = styled.h3`
  margin: 0;
  padding: ${(props) => props.theme.dimen.X4}px;
  text-align: center;
  line-height: 1;
  border-bottom: ${(props) => props.theme.border};
  flex: 1;
`;

const SubTitle = styled.h4`
  padding: 0.5rem 0;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
`;

const List = styled.ul`
  margin: ${(props) => props.theme.dimen.X4}px 0;
`;

const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  cursor: pointer;
  padding: ${(props) => props.theme.dimen.X4}px 1rem;
  margin: ${(props) => props.theme.dimen.X4}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: ${(p) => (p.selected ? p.theme.primaryColor : '#fff')};
  }

  &:hover {
    background-color: #f9f9f9;
  }
  h3 {
    text-align: left;
    border: none;
    margin: 0;
    padding: 0;
  }
  svg {
    width: 48px;
    min-width: 48px;
    height: 48px;
    display: block;
  }
`;

const ListItemContent = styled.div<{ centerContent: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${(props) => (props.centerContent ? 'center' : 'space-between')};
  margin-left: ${(props) => props.theme.dimen.X4}px;
`;

const AddressContainer = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const OrderTypeManager: FunctionComponent = () => {
  const shopData = useAppSelector(selectShop);
  const address = useAppSelector(selectAddress);
  const siblings = useAppSelector(selectSiblings);
  const orderType = useAppSelector(selectOrderType);
  const selectedMenuId = useAppSelector(selectSelectedMenu);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common-ordertype');
  const [addressData, setAddressData] = useState<IAddress | null | undefined>(undefined);
  const choosenAddressId = useAppSelector(selectSelectedAddressId);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isShowAddressSelection = useAppSelector(selectShowAddress);
  const isShowOrderTypeSelection = useAppSelector(selectShowOrderTypeSelect);
  const checkoutAddressId = useAppSelector(selectSelectedAddressId);

  function onClickDelivery(orderType: ICheckoutOrderTypes) {
    if (typeof window === 'undefined') return;
    const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS);

    dispatch(updateOrderType(orderType));

    if ((isLoggedIn && checkoutAddressId) || guestAddressString) {
      dispatch(updateShowOrderTypeSelect(false));
    } else {
      dispatch(updateShowAddAddress(true));
    }

    amplitudeEvent(constructEventName(t('@delivery'), 'model'), {});
  }

  function onClickTakeaway(orderType: ICheckoutOrderTypes) {
    dispatch(updateOrderType(orderType));
    dispatch(updateShowOrderTypeSelect(false));

    amplitudeEvent(constructEventName(t('@pickup'), 'model'), {});
  }

  function onClickDineIn(orderType: ICheckoutOrderTypes) {
    dispatch(updateOrderType(orderType));
    dispatch(updateShowOrderTypeSelect(false));

    amplitudeEvent(constructEventName(t('@dine-in'), 'model'), {});
  }

  function getSelectedAddress() {
    if (typeof window === 'undefined') return '';

    let guestAddress = window.localStorage.getItem('@LS_GUEST_USER_ADDRESS')
      ? (JSON.parse(window.localStorage.getItem('@LS_GUEST_USER_ADDRESS') ?? '') as IParticularAddress)
      : undefined;

    if (isLoggedIn && choosenAddressId) {
      const correspondAddress = useAppSelector((state) => selectAddressById(state, choosenAddressId));

      return `${correspondAddress?.address ?? ''} ${correspondAddress?.floor ?? ''}`;
    } else if (guestAddress && !isLoggedIn) return `${guestAddress?.address} ${guestAddress?.floor}`;

    return 'Enter your delivery details';
  }

  const handleBackButtonClick = async () => {
    dispatch(updateShowAddAddress(false));
  };

  useEffect(() => {
    if (shopData?.id == selectedMenuId) setAddressData(address);
    else setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);
  }, []);

  return isShowOrderTypeSelection || orderType === null ? (
    <Wrapper>
      <ContentContainer>
        <Header>
          {isShowAddressSelection && (
            <IconContainer onClick={handleBackButtonClick}>
              <SvgBackIcon />
            </IconContainer>
          )}
          <Title>{t('@order-details')}</Title>
        </Header>

        <List>
          {[
            {
              title: t('@delivery'),
              subTitle: getSelectedAddress(),
              orderType: 'DELIVERY' as ICheckoutOrderTypes,
              logo: SvgDelivery,
              onClick: onClickDelivery,
              visible: addressData?.has_delivery,
            },
            {
              title: t('@pickup'),
              subTitle: t('@quote-pickup'),
              orderType: 'PICKUP' as ICheckoutOrderTypes,
              logo: SvgPickup,
              onClick: onClickTakeaway,
              visible: addressData?.has_pickup,
            },
            {
              title: t('@dine-in'),
              subTitle: t('@dine-in-pickup'),
              orderType: 'DINE_IN' as ICheckoutOrderTypes,
              logo: SvgDinein,
              onClick: onClickDineIn,
              visible: addressData?.has_dinein,
            },
          ].map((item) => {
            if (!item.visible) return null;

            const selected = item.orderType === orderType;
            const centerContent = item.subTitle !== null && item.subTitle.length === 0;

            if (!isShowAddressSelection)
              return (
                <ListItem key={item.title} selected={selected} onClick={() => item.onClick(item.orderType)}>
                  <item.logo />

                  <ListItemContent centerContent={centerContent}>
                    <Title>{item.title}</Title>

                    {!centerContent && <SubTitle>{item.subTitle}</SubTitle>}
                  </ListItemContent>
                </ListItem>
              );
            else if (isShowAddressSelection && item.orderType === 'DELIVERY')
              return (
                <AddressContainer>
                  <ListItem key={item.title} selected={selected} onClick={() => item.onClick(item.orderType)}>
                    <item.logo />

                    <ListItemContent centerContent={centerContent}>
                      <Title>{item.title}</Title>

                      {!centerContent && <SubTitle>Enter Your Address</SubTitle>}
                    </ListItemContent>
                  </ListItem>

                  <AddAddressExtendModel />
                </AddressContainer>
              );
          })}
        </List>
      </ContentContainer>
    </Wrapper>
  ) : (
    <></>
  );
};

export default OrderTypeManager;

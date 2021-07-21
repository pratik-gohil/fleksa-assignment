import { Fragment, FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { ICheckoutOrderTypes, selectOrderType, updateOrderType, updateSelectedAddressId } from '../../../../redux/slices/checkout.slices.redux';
import SvgDelivery from '../../../../public/assets/svg/delivery.svg';
import SvgPickup from '../../../../public/assets/svg/pickup.svg';
import SvgDinein from '../../../../public/assets/svg/dinein.svg';
import SvgTick from '../../../../public/assets/svg/tick.svg';
import { updateShowAddAddress, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import { selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { useState } from 'react';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { useTranslation } from 'next-i18next';

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
`;

const SubTitle = styled.h4<{ selected: boolean }>`
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  color: ${(props) => (props.selected ? 'rgb(25, 135, 84)' : '#222')};
`;

const List = styled.ul`
  margin: ${(props) => props.theme.dimen.X4}px 0;
`;

const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  cursor: pointer;
  padding: ${(props) => props.theme.dimen.X4}px;
  margin: ${(props) => props.theme.dimen.X4}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
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

const SelectedTick = styled.div`
  svg {
    padding: 12px;
  }
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

  function onClickDelivery(orderType: ICheckoutOrderTypes) {
    dispatch(updateOrderType(orderType));
    dispatch(updateShowOrderTypeSelect(false));
    dispatch(updateShowAddAddress(true));
    dispatch(updateSelectedAddressId(null));
  }

  function onClickTakeaway(orderType: ICheckoutOrderTypes) {
    dispatch(updateOrderType(orderType));
    dispatch(updateShowOrderTypeSelect(false));
  }

  function onClickDineIn(orderType: ICheckoutOrderTypes) {
    dispatch(updateOrderType(orderType));
    dispatch(updateShowOrderTypeSelect(false));
  }

  useEffect(() => {
    if (shopData?.id == selectedMenuId) {
      setAddressData(address);
    } else {
      setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);
    }
  }, []);

  return (
    <Wrapper>
      <ContentContainer>
        <Title>{t('@order-details')}</Title>

        <List>
          {[
            {
              title: t('@delivery'),
              subTitle: t('@quote-delivery'),
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
            if (item.visible) {
              const selected = item.orderType === orderType;
              const centerContent = item.subTitle !== null && item.subTitle.length === 0;
              return (
                <ListItem key={item.title} selected={selected} onClick={() => item.onClick(item.orderType)}>
                  <item.logo />
                  <ListItemContent centerContent={centerContent}>
                    <Title>{item.title}</Title>
                    {!centerContent && <SubTitle selected={selected}>{item.subTitle}</SubTitle>}
                  </ListItemContent>
                  {selected && (
                    <SelectedTick>
                      <SvgTick />
                    </SelectedTick>
                  )}
                </ListItem>
              );
            } else {
              return <Fragment key={item.title} />;
            }
          })}
        </List>
      </ContentContainer>
    </Wrapper>
  );
};

export default OrderTypeManager;

import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import {
  ICheckoutOrderTypes,
  selectOrderType,
  selectSelectedAddressId,
  updateDeliveryFinances,
  updateOrderType,
  updateSelectedAddressId,
} from '../../../../redux/slices/checkout.slices.redux';
import SvgDelivery from '../../../../public/assets/svg/delivery.svg';
import SvgPickup from '../../../../public/assets/svg/pickup.svg';
import SvgDinein from '../../../../public/assets/svg/dinein.svg';
import { selectShowAddress, updateShowAddAddress, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import { selectConfiguration, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { useState } from 'react';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { useTranslation } from 'next-i18next';
import {
  selectAddressById,
  selectAddressByType,
  selectBearerToken,
  selectIsUserLoggedIn,
} from '../../../../redux/slices/user.slices.redux';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import AddAddressExtendModel from '../addresses/address-add.-extend.common.templateOne.components';
import SvgBackIcon from '../../../../public/assets/svg/account/back-arrow.svg';
import SvgEdit from '../../../../public/assets/svg/edit.svg';
import { LS_GUEST_USER_ADDRESS } from '../../../../constants/keys-local-storage.constants';
import PyApiHttpPostAddress from '../../../../http/pyapi/address/post.address.pyapi.http';

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
  max-height: 85%;
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

const SubTitlesContainer = styled.div`
  padding: 0.5rem 0;
`;

const SubTitle1 = styled.h4`
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 12px;
  }
`;

const SubTitle2 = styled.h4`
  padding: 0.3rem 0 0 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 12px;
  }
`;

const List = styled.ul`
  margin: ${(props) => props.theme.dimen.X4}px 0;
`;

const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  padding: 1rem;
  margin: 0 ${(props) => props.theme.dimen.X4}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 10px;
    background: ${(p) => (p.selected ? p.theme.primaryColor : 'transparent')};
  }

  h3 {
    text-align: left;
    border: none;
    margin: 0;
    padding: 0;
  }
  svg {
    width: 48px;
    height: 48px;
    display: block;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0.5rem;

    svg {
      width: 36px;
      height: 36px;
    }

    &::before {
      width: 6px;
    }
  }
`;

const ListItemContent = styled.div<{ centerContent: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;

  justify-content: ${(props) => (props.centerContent ? 'center' : 'space-between')};
  margin-left: ${(props) => props.theme.dimen.X4}px;
`;

const AddressContainer = styled.div`
  display: flex;
  padding: 0 1rem;
`;

const LocationIconContainer = styled.div`
  display: flex;

  svg {
    width: 48px;
    height: 48px;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    svg {
      display: none;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const EditIconContainer = styled.div`
  cursor: pointer;
  border-radius: 50%;
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: 35px;
    width: 35px;

    svg {
      width: 16px;
      height: 16px;
    }
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
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isShowAddressSelection = useAppSelector(selectShowAddress);
  const checkoutAddressId = useAppSelector(selectSelectedAddressId);
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);

  const correspondAddress = useAppSelector((state) => selectAddressByType(state, 'OTHER'));
  const correspondAddressById = useAppSelector((state) => selectAddressById(state, checkoutAddressId));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (shopData?.id == selectedMenuId) setAddressData(address);
    else setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);

    // ?? Update default selection
  }, []);

  // TODO: Enable and disable scroll when modal opened
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  function onClickDelivery(orderType: ICheckoutOrderTypes) {
    if (typeof window === 'undefined') return;
    const guestAddressString = window.localStorage.getItem(LS_GUEST_USER_ADDRESS);

    if ((isLoggedIn && correspondAddress) || guestAddressString) {
      dispatch(updateShowOrderTypeSelect(false));
      dispatch(updateOrderType(orderType));

      // ?? Make the pyapi request to get delivery finance information and valid address checking
      makeConfirmRequestToPyapi(correspondAddress);
    } else {
      dispatch(updateShowAddAddress(true));
      dispatch(updateShowOrderTypeSelect(true));
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

  /**
   * @description get selected default address on user profile or local storage
   */
  function getSelectedAddress() {
    if (typeof window === 'undefined') return;

    let guestAddress = window.localStorage.getItem('@LS_GUEST_USER_ADDRESS')
      ? (JSON.parse(window.localStorage.getItem('@LS_GUEST_USER_ADDRESS') ?? '') as IParticularAddress)
      : undefined;

    if (isLoggedIn && checkoutAddressId && correspondAddressById) {
      return {
        address: correspondAddressById?.address,
        floor: correspondAddressById?.floor,
        potalCode: correspondAddressById?.postal_code,
        city: correspondAddressById?.city,
      };
    } else if (isLoggedIn && !checkoutAddressId && correspondAddress) {
      // ?? Update the checkoutAddressId on redux state to send for order placing
      dispatch(updateSelectedAddressId(correspondAddress.id));

      return {
        address: correspondAddress?.address,
        floor: correspondAddress?.floor,
        potalCode: correspondAddress?.postal_code,
        city: correspondAddress?.city,
      };
    } else if (guestAddress && !isLoggedIn)
      return {
        address: guestAddress?.address,
        floor: guestAddress?.floor,
        potalCode: guestAddress?.postal_code,
        city: guestAddress?.city,
      };

    return {
      address: 'Enter your delivery details',
      floor: '',
      potalCode: '',
      city: '',
    };
  }

  /**
   *
   * @param Object contains seperate portions of the address (floor, address, area, city, addressType, postalCode)
   */
  async function makeConfirmRequestToPyapi(address?: IParticularAddress) {
    if (!address) return;

    amplitudeEvent(constructEventName(`address model save address`, 'button'), {});

    if (selectedMenuId) {
      const response = await new PyApiHttpPostAddress(configuration).postAll({
        area: address.area ?? '',
        city: address.city,
        floor: `${address.floor}` ?? '',
        address: address.address ?? '',
        addressType: address.address_type,
        shopId: selectedMenuId,
        postalCode: address.postal_code,
        token: bearerToken,
      });

      if (response?.result && response.possibilities[selectedMenuId].is_available) {
        dispatch(updateDeliveryFinances(response.possibilities[selectedMenuId].details));

        if (isLoggedIn && bearerToken && response.customer.details) {
          const addressData: IParticularAddress = {
            id: response.customer.details?.customer_address_id,
            address_type: address.address_type,
            floor: `${address.floor}` ?? '',
            address: address.address ?? '',
            country: '',
            postal_code: address.postal_code,
            city: address.city,
            state: '',
            area: address.area ?? '',
          };

          dispatch(updateSelectedAddressId(response.customer.details?.customer_address_id));
          dispatch(updateShowAddAddress(false));
          dispatch(updateOrderType('DELIVERY'));

          amplitudeEvent(constructEventName(`address model save address user response`, 'success'), { addressData, response });
        }
      } else {
        console.log('error descripton ', response?.description);
        amplitudeEvent(constructEventName(`address model save address response`, 'error'), { description: response?.description });
      }
    }
  }

  /**
   *
   * @returns updating state of show add address model extension
   */
  const handleBackButtonClick = async () => dispatch(updateShowAddAddress(false));

  const handleDeliveryEditIconClick = async () => dispatch(updateShowAddAddress(true));

  /**
   * @returns {Boolean} check if address selected already or not
   */
  const checkAddressSelectionState: () => boolean = () => {
    if (typeof window === 'undefined') return false;

    let guestAddress = window.localStorage.getItem('@LS_GUEST_USER_ADDRESS')
      ? (JSON.parse(window.localStorage.getItem('@LS_GUEST_USER_ADDRESS') ?? '') as IParticularAddress)
      : undefined;

    if ((isLoggedIn && correspondAddress) || (!isLoggedIn && guestAddress)) return true;

    return false;
  };

  return (
    <Wrapper>
      <ContentContainer>
        <Header>
          {isShowAddressSelection ? (
            <>
              <IconContainer onClick={handleBackButtonClick}>
                <SvgBackIcon />
              </IconContainer>

              <Title>{t('@delivery-details')}</Title>
            </>
          ) : (
            <Title>{t('@order-details')}</Title>
          )}
        </Header>

        <List>
          {[
            {
              title: t('@delivery'),
              subTitle1: '',
              subTitle2: '',
              subTitle3: '',
              orderType: 'DELIVERY' as ICheckoutOrderTypes,
              logo: SvgDelivery,
              onClick: onClickDelivery,
              visible: addressData?.has_delivery,
              isEditable: true && checkAddressSelectionState(),
              editAction: handleDeliveryEditIconClick,
            },
            {
              title: t('@pickup'),
              subTitle1: t('@quote-pickup'),
              orderType: 'PICKUP' as ICheckoutOrderTypes,
              logo: SvgPickup,
              onClick: onClickTakeaway,
              visible: addressData?.has_pickup,
              isEditable: false,
            },
            {
              title: t('@dine-in'),
              subTitle1: t('@dine-in-pickup'),
              orderType: 'DINE_IN' as ICheckoutOrderTypes,
              logo: SvgDinein,
              onClick: onClickDineIn,
              visible: addressData?.has_dinein,
              isEditable: false,
            },
          ].map((item) => {
            if (!item.visible) return null;

            let selected = item.orderType === orderType;

            const centerContent = item.subTitle1 ? item.subTitle1.length === 0 : false;

            if (item.orderType === 'DELIVERY') {
              const currentAddress = getSelectedAddress();
              item.subTitle1 = `${currentAddress?.address ?? ''}`;
              item.subTitle2 = `${currentAddress?.floor ?? ''}`;
              item.subTitle3 = `${currentAddress?.potalCode ?? ''} ${currentAddress?.city ?? ''}`;
            }

            if (!isShowAddressSelection)
              return (
                <ListItem key={item.title} selected={selected && !isShowAddressSelection}>
                  <item.logo onClick={() => item.onClick(item.orderType)} />

                  <ListItemContent centerContent={centerContent} onClick={() => item.onClick(item.orderType)}>
                    <Title>{item.title}</Title>

                    {!centerContent && (
                      <SubTitlesContainer>
                        <SubTitle1>{item.subTitle1}</SubTitle1>

                        {!!item?.subTitle2 && <SubTitle2>{item.subTitle2}</SubTitle2>}
                        {!!item?.subTitle3 && <SubTitle2>{item.subTitle3}</SubTitle2>}
                      </SubTitlesContainer>
                    )}
                  </ListItemContent>

                  {item.isEditable && (
                    <EditIconContainer onClick={item.editAction}>
                      <SvgEdit />
                    </EditIconContainer>
                  )}
                </ListItem>
              );
            else if (isShowAddressSelection && item.orderType === 'DELIVERY')
              return (
                <AddressContainer>
                  <LocationIconContainer>
                    <item.logo />
                  </LocationIconContainer>

                  <AddAddressExtendModel />
                </AddressContainer>
              );
          })}
        </List>
      </ContentContainer>
    </Wrapper>
  );
};

export default OrderTypeManager;

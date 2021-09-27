import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import SvgDelivery from '../../../../public/assets/svg/delivery.svg';
import SvgPickup from '../../../../public/assets/svg/pickup.svg';
import SvgDinein from '../../../../public/assets/svg/dinein.svg';
import {
  ICheckoutOrderTypes,
  selectOrderType,
  updateOrderType,
  updateSelectedAddressId,
} from '../../../../redux/slices/checkout.slices.redux';
import { updateShowAddAddress, updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import { checkIsSelectedOrderTypeAvailable, selectAvailableOrderType, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { useTranslation } from 'next-i18next';
import SvgEdit from '../../../../public/assets/svg/edit.svg';
import CustomLink from '../../common/amplitude/customLink';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { RootState } from '../../../../redux/store.redux';
import { selectAddressByType, selectCustomerAllAddress } from '../../../../redux/slices/user.slices.redux';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-top: ${(props) => props.theme.dimen.X4 * 3}px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-top: 0.5rem;
  }
`;

const EditButton = styled.div`
  padding: 0 0.5rem;
`;

const ButtonContainer = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 0 ${(props) => props.theme.dimen.X4}px;
  margin: 0 ${(props) => props.theme.dimen.X4}px;
  background: #f9f9f9;
  display: flex;
  align-items: center;

  svg {
    width: auto;
    height: 24px;
    display: block;
    padding-left: 0.5rem;
  }
`;

const ChangeRestaurantButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-weight: 700;
  color: #222;
`;

const OrderTypeContainer = styled.div`
  height: inherit;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0 ${(props) => props.theme.dimen.X4}px;
  background: #f9f9f9;
  svg {
    width: auto;
    height: 24px;
    display: block;
    padding-left: 0.5rem;
  }
  p {
    margin: 0 0 0 ${(props) => props.theme.dimen.X4}px;
    padding: 0;
    font-weight: 700;
  }
`;

const OrderTypeView = styled.div`
  height: 50px;
`;

const OrderType: Record<
  ICheckoutOrderTypes,
  {
    title: string;
    logo: any;
  }
> = {
  DELIVERY: {
    title: 'DELIVERY',
    logo: SvgDelivery,
  },
  PICKUP: {
    title: 'PICKUP',
    logo: SvgPickup,
  },
  DINE_IN: {
    title: 'DINE-IN',
    logo: SvgDinein,
  },
  // placeholder item. order type will not be reservation
  RESERVATION: {
    title: '',
    logo: SvgDinein,
  },
};

const MenuFeatures: FunctionComponent = () => {
  const { t } = useTranslation('page-menu-id');
  const dispatch = useAppDispatch();

  const selectedOrderType = useAppSelector(selectOrderType);
  const siblingsData = useAppSelector(selectSiblings);
  const availableOrderTypes = useAppSelector(selectAvailableOrderType);
  const customerAddresses = useAppSelector(selectCustomerAllAddress);
  const correspondAddress = useAppSelector((state) => selectAddressByType(state, 'OTHER'));

  const orderTypeData = selectedOrderType && OrderType[selectedOrderType];
  const isSelectedOrderTypeAvailable = useAppSelector((state: RootState) => checkIsSelectedOrderTypeAvailable(state, selectedOrderType));

  /**
   * ?? When change on my.fleksa.com order type front end user facing some type mismatch selection issue fix for that
   * to use this effect and also we update if they've only one ordertype available it'll be auto select otherwise vice versa.
   */
  useEffect(() => {
    if (!isSelectedOrderTypeAvailable && selectedOrderType && availableOrderTypes.count > 1) {
      dispatch(updateShowOrderTypeSelect(true));
      dispatch(updateOrderType(null));
    } else if (availableOrderTypes.count === 1) {
      /**
       * if available only delivery but user doesn't have any address whot the edit model instead default select
       */
      if (availableOrderTypes.types[0] === 'DELIVERY') {
        if (!customerAddresses.length) {
          dispatch(updateShowOrderTypeSelect(true));
          dispatch(updateShowAddAddress(true));
        }

        // ?? Update the address id if they've address already
        else if (correspondAddress) {
          dispatch(updateSelectedAddressId(correspondAddress.id));
          dispatch(updateOrderType(availableOrderTypes.types[0]));
        }
      }

      // ?? If only one avaiable then update without asking to user
      else dispatch(updateOrderType(availableOrderTypes.types[0]));
    }
  }, []);

  function onClickOrderType() {
    dispatch(updateShowOrderTypeSelect(true));
  }

  return (
    <Wrapper>
      <OrderTypeView>
        {selectedOrderType && orderTypeData && !!availableOrderTypes.count && (
          <CustomLink
            amplitude={{
              type: 'button',
              text: t(`@${orderTypeData.title.toLowerCase()}`).toUpperCase(),
            }}
            callback={onClickOrderType}
            Override={OrderTypeContainer}
          >
            <orderTypeData.logo />
            <p>{t(`@${orderTypeData.title.toLowerCase()}`).toUpperCase()}</p>
            <EditButton>
              <SvgEdit />
            </EditButton>
          </CustomLink>
        )}
      </OrderTypeView>

      {siblingsData.length > 0 && (
        <ButtonContainer>
          <CustomLink
            href="/menu"
            amplitude={{
              type: 'button',
              text: t('@change-shop'),
            }}
            Override={ChangeRestaurantButton}
            placeholder={t('@change-shop')}
          />

          <EditButton>
            <SvgEdit />
          </EditButton>
        </ButtonContainer>
      )}
    </Wrapper>
  );
};

export default MenuFeatures;

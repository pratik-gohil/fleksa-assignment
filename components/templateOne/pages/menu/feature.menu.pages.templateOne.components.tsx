import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import SvgDelivery from '../../../../public/assets/svg/delivery.svg';
import SvgPickup from '../../../../public/assets/svg/pickup.svg';
import SvgDinein from '../../../../public/assets/svg/dinein.svg';
import { ICheckoutOrderTypes, selectOrderType } from '../../../../redux/slices/checkout.slices.redux';
import { updateShowOrderTypeSelect } from '../../../../redux/slices/menu.slices.redux';
import { selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { useTranslation } from 'next-i18next';
import SvgEdit from '../../../../public/assets/svg/edit.svg';
import CustomLink from '../../common/amplitude/customLink';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-top: ${(props) => props.theme.dimen.X4 * 3}px;
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
  const selectedOrderType = useAppSelector(selectOrderType);
  const siblingsData = useAppSelector(selectSiblings);
  const languageCode = useAppSelector(selectLanguageCode);
  const dispatch = useAppDispatch();
  const orderTypeData = selectedOrderType && OrderType[selectedOrderType];
  const { t } = useTranslation('page-menu-id');

  function onClickOrderType() {
    dispatch(updateShowOrderTypeSelect(true));
  }

  return (
    <Wrapper>
      <OrderTypeView>
        {selectedOrderType && orderTypeData && (
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
          <ChangeRestaurantButton href={`/${languageCode}/menu`}>{t('@change-shop')}</ChangeRestaurantButton>
          <EditButton>
            <SvgEdit />
          </EditButton>
        </ButtonContainer>
      )}
    </Wrapper>
  );
};

export default MenuFeatures;

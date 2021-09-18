import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import PyApiHttpPostOffers from '../../../../http/pyapi/offers/post.offers.pyapi.http';
import { IMakeOrderProducts } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import { selectOrderType, selectPaymentMethod, selectPromoCode, updatePromoCode } from '../../../../redux/slices/checkout.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import {
  selectConfiguration,
  selectLanguage,
  selectLanguageCode,
  selectSelectedMenu,
} from '../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { getPrductsFromCartData } from '../../../../utils/products.utils';
import { StyledCheckoutCard, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import EditButton from './edit-button.checkout.pages.templateOne.components';
import EditContainer from './edit-container.checkout.pages.templateOne.components';

import SvgTag from '../../../../public/assets/svg/tag.svg';
import SvgCross from '../../../../public/assets/svg/cross.svg';
import formatCurrency from '../../../../utils/formatCurrency';
import { useTranslation } from 'next-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { IOffer } from '../../../../interfaces/common/offer.common.interfaces';
import { selectOffers } from '../../../../redux/slices/index.slices.redux';

const ApplyButton = styled.div`
  padding: 0.5rem 1rem;
  margin-left: ${(props) => props.theme.dimen.X4}px;
  background: ${(p) => p.theme.textDarkColor};
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  text-align: center;

  &:hover,
  &:active,
  &:focus {
    background: ${(p) => p.theme.textDarkActiveColor};
  }
`;

const AppliedPromoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  svg {
    display: block;
  }
  .svg-tag-yellow {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.primaryColor};
  }
`;

const RemovePromo = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: 100px;

  svg {
    width: 10px;
    height: 10px;
  }
`;

const TextSaved = styled.p`
  display: flex;
  flex: 1;
  margin-left: 12px;
`;

const PromoCodeContainer = styled.div`
  padding: 0rem 0.5rem 0 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
`;

const PromoCodeInput = styled.input`
  display: flex;
  flex: 1;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 0% 0.5rem;
  outline: none;
  text-transform: uppercase;
  border: 0.1px solid ${(p) => p.theme.textDarkColor};

  &:hover,
  &:active,
  &:focus {
    border: 2px solid ${(p) => p.theme.textDarkActiveColor};
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0 0.5rem;
    width: 60%;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0 0 0;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
`;

const Chip = styled.p<{ active: boolean }>`
  padding: 0.3rem 0.5rem;
  min-width: 80px;
  border-radius: 50px;
  text-align: center;
  font-weight: 500;
  border: 1px solid ${(p) => p.theme.primaryColor};
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(p) => p.theme.textDarkColor};
  transition: background 0.2s linear;
  background: ${(p) => (p.active ? p.theme.primaryColor : 'transparent')};

  &:hover {
    background: ${(p) => p.theme.primaryColor};
    color: ${(p) => p.theme.textDarkActiveColor};
  }
`;

const CheckoutPagePromoCode: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const orderType = useAppSelector(selectOrderType);
  const shopId = useAppSelector(selectSelectedMenu);
  const promoCodeData = useAppSelector(selectPromoCode);
  const languageCode = useAppSelector(selectLanguageCode);
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const offersData = useAppSelector(selectOffers);
  const { t } = useTranslation('page-checkout');

  const [editing, setEditing] = useState(true);
  const [coupon, setCoupon] = useState(promoCodeData?.code || '');
  const [offers, setOffers] = useState<IOffer[]>(offersData);
  const dispatch = useAppDispatch();

  /**
   * @description update offers depends on relavent ordery type selection
   */
  useEffect(() => {
    if (orderType) {
      const properTypeName = orderType === 'DINE_IN' ? 'DINEIN' : orderType; // ? change same order type name

      setOffers(
        offersData.filter((offer) => offer.order_type_ === properTypeName || offer.order_type_ === 'ALL' || offer.order_type_ === 'FIRST'),
      );
    }
  }, [orderType]);

  /**
   * @description apply discount coupon on checkout
   */
  async function onClickApply() {
    amplitudeEvent(constructEventName(`coupon apply`, 'button'), {
      coupon,
      length: coupon.length,
    });

    if (orderType && shopId && coupon) {
      const products: Array<IMakeOrderProducts> = getPrductsFromCartData(cartData);

      const response = await new PyApiHttpPostOffers(configuration).post({
        products,
        code: coupon,
        orderType: orderType,
        shopId,
        token: bearerToken ?? '',
        payment_method: paymentMethod,
      });

      if (response?.result) {
        dispatch(
          updatePromoCode({
            code: coupon,
            value: response.details.amount.discount_total,
            token: response.token,
          }),
        );

        amplitudeEvent(constructEventName(`coupon apply success`, 'response'), response);
      } else {
        dispatch(updatePromoCode(null));

        console.log(response?.message);
        dispatch(
          updateError({
            show: true,
            message: response?.message[language] ?? 'Something went wrong!',
            severity: 'error',
          }),
        );

        amplitudeEvent(constructEventName(`coupon apply error`, 'response'), response);
      }
    }
  }

  /**
   * @description replace suggested coupon code
   */
  const hanldePromoCodeClick = async (text: string) => setCoupon(text);

  return (
    <StyledCheckoutCard>
      <EditContainer>
        <StyledCheckoutTitle>{t('@promo')}</StyledCheckoutTitle>
        {!promoCodeData && (
          <EditButton
            onClick={() => {
              setEditing(!editing);
              amplitudeEvent(constructEventName(`promo code edit`, 'icon-button'), {});
            }}
          />
        )}
      </EditContainer>

      <Row>
        <Col xs={12}>
          {editing && promoCodeData ? (
            <AppliedPromoContainer>
              <SvgTag className="svg-tag-yellow" />
              <TextSaved>
                {t('@saved')} <strong style={{ marginLeft: 4 }}>{formatCurrency(promoCodeData.value, languageCode)}</strong>
              </TextSaved>

              <RemovePromo onClick={() => dispatch(updatePromoCode(null))}>
                <SvgCross />
              </RemovePromo>
            </AppliedPromoContainer>
          ) : (
            <PromoCodeContainer>
              <InputContainer>
                <PromoCodeInput
                  value={coupon}
                  autoFocus
                  onChange={(e) => setCoupon(e.target.value)}
                  onBlur={() => {
                    amplitudeEvent(constructEventName(`coupon `, 'input'), {
                      coupon,
                      length: coupon.length,
                    });
                  }}
                  required
                />

                <ApplyButton onClick={onClickApply}>{t('@apply')}</ApplyButton>
              </InputContainer>

              <ChipContainer>
                {offers.map((offer) => {
                  return (
                    <Chip active={offer.code === coupon} onClick={async () => await hanldePromoCodeClick(offer.code)}>
                      {offer.code}
                    </Chip>
                  );
                })}
              </ChipContainer>
            </PromoCodeContainer>
          )}
        </Col>
      </Row>
    </StyledCheckoutCard>
  );
};

export default CheckoutPagePromoCode;

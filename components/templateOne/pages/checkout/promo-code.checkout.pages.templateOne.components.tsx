import React, { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import PyApiHttpPostOffers from '../../../../http/pyapi/offers/post.offers.pyapi.http';
import { IMakeOrderProducts } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import { selectOrderType, selectPromoCode, selectTip, updatePromoCode } from '../../../../redux/slices/checkout.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import {
  selectConfiguration,
  selectLanguage,
  selectLanguageCode,
  selectSelectedMenu,
} from '../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { checkoutFinalAmount } from '../../../../utils/checkout.utils';
import { getPrductsFromCartData } from '../../../../utils/products.utils';
import { StyledCheckoutCard, StyledCheckoutInput, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import EditButton from './edit-button.checkout.pages.templateOne.components';
import EditContainer from './edit-container.checkout.pages.templateOne.components';

import SvgTag from '../../../../public/assets/svg/tag.svg';
import SvgCross from '../../../../public/assets/svg/cross.svg';
import formatCurrency from '../../../../utils/formatCurrency';
import { useTranslation } from 'next-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

const ApplyButton = styled.div`
  padding: ${(props) => props.theme.dimen.X2}px ${(props) => props.theme.dimen.X4 * 2}px;
  margin-left: ${(props) => props.theme.dimen.X4}px;
  background: #777;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 40%;
    padding: 0.5rem 0;
    font-size: 14px;
    text-align: center;
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
  padding: 10px;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: 100px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const TextSaved = styled.p`
  display: flex;
  flex: 1;
  margin-left: 12px;
`;

const CheckoutPagePromoCode: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const orderType = useAppSelector(selectOrderType);
  const shopId = useAppSelector(selectSelectedMenu);
  const tipData = useAppSelector(selectTip);
  const promoCodeData = useAppSelector(selectPromoCode);
  const languageCode = useAppSelector(selectLanguageCode);
  const { t } = useTranslation('page-checkout');

  const [editing, setEditing] = useState(false);
  const [coupon, setCoupon] = useState(promoCodeData?.code || '');
  const dispatch = useAppDispatch();

  async function onClickApply() {
    amplitudeEvent(constructEventName(`coupon apply`, 'button'), {
      coupon,
      length: coupon.length,
    });

    if (orderType && shopId && bearerToken) {
      const products: Array<IMakeOrderProducts> = getPrductsFromCartData(cartData);
      const checkoutFinalAmountWithoutPromo = checkoutFinalAmount(cartData.cartCost, tipData);
      const response = await new PyApiHttpPostOffers(configuration).post({
        products,
        code: coupon,
        orderType: orderType,
        shopId,
        subTotalAmount: checkoutFinalAmountWithoutPromo,
        token: bearerToken,
      });
      if (response?.result) {
        dispatch(
          updatePromoCode({
            code: coupon,
            value: response.details.value,
            token: response.token,
          }),
        );

        amplitudeEvent(constructEventName(`coupon apply success`, 'response'), response);
      } else {
        dispatch(updatePromoCode(null));
        dispatch(
          updateError({
            show: true,
            message: response?.message[language],
            severity: 'error',
          }),
        );

        amplitudeEvent(constructEventName(`coupon apply error`, 'response'), response);
      }
    }
  }

  useEffect(() => {
    if (promoCodeData) onClickApply();
  }, []);

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
          {editing ? (
            <EditContainer>
              {promoCodeData ? (
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
                <>
                  <StyledCheckoutInput
                    value={coupon}
                    autoFocus
                    onChange={(e) => setCoupon(e.target.value)}
                    onBlur={() => {
                      amplitudeEvent(constructEventName(`coupon `, 'input'), {
                        coupon,
                        length: coupon.length,
                      });
                    }}
                  />
                  <ApplyButton onClick={onClickApply}>{t('@apply')}</ApplyButton>
                </>
              )}
            </EditContainer>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </StyledCheckoutCard>
  );
};

export default CheckoutPagePromoCode;

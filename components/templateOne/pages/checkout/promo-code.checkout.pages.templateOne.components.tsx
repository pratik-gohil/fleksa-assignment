import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import PyApiHttpPostOffers from '../../../../http/pyapi/offers/post.offers.pyapi.http';
import { IMakeOrderProducts } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import {
  selectIsOffersOpen,
  selectOrderType,
  selectPaymentMethod,
  selectPromoCode,
  updateCheckoutIsOffersOpen,
  updatePromoCode,
} from '../../../../redux/slices/checkout.slices.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import {
  selectConfiguration,
  selectLanguage,
  selectLanguageCode,
  selectSelectedMenu,
} from '../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { getPrductsFromCartData } from '../../../../utils/products.utils';
import { StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';

import { useTranslation } from 'next-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { IOffer } from '../../../../interfaces/common/offer.common.interfaces';
import { selectOffers } from '../../../../redux/slices/index.slices.redux';

import SvgDelivery from '../../../../public/assets/svg/delivery.svg';
import SvgPickup from '../../../../public/assets/svg/pickup.svg';
import SvgDinein from '../../../../public/assets/svg/dinein.svg';
import SvgFirstOffer from '../../../../public/assets/svg/checkout/allOfferIcon.svg';
import SvgAllOffer from '../../../../public/assets/svg/checkout/firstOfferIcon.svg';
import SvgOffer from '../../../../public/assets/svg/checkout/offerIcon.svg';

import formatCurrency from '../../../../utils/formatCurrency';

const Wrapper = styled.div`
  padding: 1rem 0 0 0;
`;

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

const PromoCodeContainer = styled.div`
  padding-top: 0.5rem;
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

const OffersContainer = styled.div`
  margin-bottom: 0.5rem;
`;

const DropDownContainer = styled.div``;
const DropDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    & > h4:after {
      width: 100%;
      left: 0;
      background: ${(props) => props.theme.primaryColor};
    }
  }
`;

const Title = styled.h4<{ isDropdown: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  padding: ${(p) => (p.isDropdown ? '1rem 0 0 0' : '0')};
  margin: 0;
  position: relative;
  color: ${(p) => p.theme.primaryColor};
  font-weight: 700;
  transition: all 0.2s linear;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    display: block;

    right: 0;
    background: ${(props) => props.theme.primaryColor};
    transition: width 0.2s ease;
    -webkit-transition: width 0.2s ease;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
  }
`;

const OfferBody = styled.div<{ isDropdown: boolean }>`
  transition: transform 0.3s ease-in-out;

  height: ${(p) => (p.isDropdown ? 'auto' : '0px')};
  overflow: auto;
  transform: ${(p) => (p.isDropdown ? 'translateY(0%)' : 'translateY(100%)')};
`;

const OfferItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const OfferCardBody = styled.div``;

const OfferBodyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
`;

const Ticket = styled.p`
  margin: 0 1rem;
  padding: 0.3rem 0.3rem;
  font-size: 0.7rem;
  position: relative;
  border: 1px dotted rgba(0, 0, 0, 1);
`;

const SymbolIcon = styled.div`
  padding: 0 0.5rem 0 0;
  display: grid;
  place-items: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const OfferCode = styled.h4`
  padding: 0;
  margin: 0;
`;

const OfferGetText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
`;

const OfferDescription = styled(OfferGetText)`
  font-weight: 400;

  span {
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const OfferApplyButton = styled.button`
  padding: 0.5rem 0.5rem;

  font-weight: 700;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius}px;
  text-align: center;
  background: transparent;
  border: 2px solid ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textDarkColor};
  transition: all 0.15s ease-in;
  text-transform: uppercase;

  &:hover,
  &:active,
  &:focus {
    background: ${(p) => p.theme.textDarkActiveColor};
    color: #fff;
  }
`;

const OfferIcon = styled.div`
  display: grid;
  place-items: center;

  svg {
    width: 24px;
    height: 18px;
    fill: #000000;
  }
`;

const Divider = styled.hr`
  border-color: rgba(0, 0, 0, 0.1);
`;

const AppliedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const TextSaved = styled.p`
  display: flex;
  margin-left: 12px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 13px;
    margin-left: 5px;
  }
`;

const RemovePromo = styled.div`
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: 100px;
  margin: 0 1rem;
  opacity: 0.5;
  transition: opacity 0.1s ease-out;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;

  &:hover,
  &:active,
  &:focus {
    opacity: 1;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0 0 0 5px;
    padding: 0.3rem;
  }
`;

const SvgCrossImage = styled.img`
  width: 10px;
  height: 10px;
`;

const Price = styled.p`
  margin: 0;
  font-weight: 600;
`;

const DropDownBody = styled.div`
  display: flex;
  align-items: center;
`;

const SelectText = styled.p`
  padding: 0 0.5rem;
  margin: 0;
`;

const CheckoutPagePromoCode: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const orderType = useAppSelector(selectOrderType);
  const shopId = useAppSelector(selectSelectedMenu);
  const promoCodeData = useAppSelector(selectPromoCode);
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const offersData = useAppSelector(selectOffers);
  const isDropdown = useAppSelector(selectIsOffersOpen);
  const languageCode = useAppSelector(selectLanguageCode);

  const { t } = useTranslation('page-checkout');

  const [coupon, setCoupon] = useState(promoCodeData?.code || '');
  const [offers, setOffers] = useState<IOffer[]>(offersData);
  const [moreDescription, setMoreDescription] = useState<string>('');

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
            value: response.details.amount.value,
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

  /**
   *
   * @param desc update state of description expand
   * @returns Update
   */
  const handleDescriptionMoreClick = async (desc: string) => setMoreDescription(desc);

  /**
   * @description Updating dropdown statte
   */
  const handleDropdownClick = async () => dispatch(updateCheckoutIsOffersOpen(!isDropdown));

  /**
   *
   * @param order_type correspond order type icon component
   */
  const getCorrespondOfferIcon = (order_type: string) => {
    switch (order_type) {
      case 'PICKUP':
        return <SvgPickup />;
      case 'DELIVERY':
        return <SvgDelivery />;
      case 'DINEIN':
        return <SvgDinein />;
      case 'FIRST':
        return <SvgFirstOffer />;

      case 'ALL':
        return <SvgAllOffer />;

      default:
        return <SvgOffer />;
    }
  };

  return promoCodeData ? (
    <AppliedContainer>
      <div>
        <SvgOffer />
        <TextSaved>
          {t('@saved')} <strong style={{ marginLeft: 4 }}>{formatCurrency(promoCodeData.value, languageCode)}</strong>
        </TextSaved>

        <RemovePromo onClick={() => dispatch(updatePromoCode(null))}>
          <SvgCrossImage src="/assets/svg/cross.svg" />
        </RemovePromo>
      </div>

      <Price> - {formatCurrency(promoCodeData.value, languageCode)}</Price>
    </AppliedContainer>
  ) : (
    <Wrapper>
      <StyledCheckoutTitle>{t('@promo')}</StyledCheckoutTitle>

      <Row>
        <Col xs={12}>
          <PromoCodeContainer>
            {isDropdown && (
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
            )}

            <OffersContainer>
              <DropDownContainer onClick={handleDropdownClick}>
                <DropDown>
                  <DropDownBody>
                    <OfferIcon>
                      <SvgOffer />
                    </OfferIcon>
                    <SelectText>Select a promocode</SelectText>
                  </DropDownBody>

                  <Title isDropdown={isDropdown}>{isDropdown ? 'Hide' : 'Show'}</Title>
                </DropDown>

                <Divider />
              </DropDownContainer>

              <OfferBody isDropdown={isDropdown}>
                {offers.map((offerItem, offerItemIndex) => {
                  return (
                    <>
                      <OfferItem>
                        <OfferCardBody>
                          <OfferBodyHeader>
                            <SymbolIcon>{getCorrespondOfferIcon(offerItem.order_type_)}</SymbolIcon>
                            <OfferCode>{t(`@${offerItem.order_type_.toLowerCase()}`)}</OfferCode>
                            <Ticket>{offerItem.code}</Ticket>
                          </OfferBodyHeader>

                          <OfferGetText>
                            {t('@discount-of')}{' '}
                            {offerItem.offer_type_ === 'PERCENTAGE'
                              ? `${offerItem.provided}%`
                              : offerItem.offer_type_ === 'AMOUNT'
                              ? `${offerItem.provided} €`
                              : ''}{' '}
                            {t('@above')} {offerItem.min_amount} €
                          </OfferGetText>

                          <OfferDescription>
                            {(offerItem.description_json && offerItem.description_json?.[language].length < 60) ||
                            moreDescription === `desc-${offerItemIndex}` ? (
                              <>
                                {`${offerItem.description_json?.[language]} `}

                                {moreDescription === `desc-${offerItemIndex}` && (
                                  <span onClick={async () => await handleDescriptionMoreClick('')}>{t('@less')}</span>
                                )}
                              </>
                            ) : (
                              <>
                                {offerItem.description_json?.[language].slice(0, 60)}
                                <span onClick={async () => await handleDescriptionMoreClick(`desc-${offerItemIndex}`)}>
                                  {' '}
                                  ... {t('@more')}
                                </span>
                              </>
                            )}
                          </OfferDescription>
                        </OfferCardBody>

                        <OfferApplyButton onClick={async () => await hanldePromoCodeClick(offerItem.code)}>{t('@apply')}</OfferApplyButton>
                      </OfferItem>

                      <Divider />
                    </>
                  );
                })}
              </OfferBody>
            </OffersContainer>
          </PromoCodeContainer>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CheckoutPagePromoCode;

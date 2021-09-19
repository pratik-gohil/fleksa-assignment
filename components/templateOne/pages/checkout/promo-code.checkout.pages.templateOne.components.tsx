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
import { selectConfiguration, selectLanguage, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { getPrductsFromCartData } from '../../../../utils/products.utils';
import { StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';

import { useTranslation } from 'next-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { IOffer } from '../../../../interfaces/common/offer.common.interfaces';
import { selectOffers } from '../../../../redux/slices/index.slices.redux';

import SvgOffer from '../../../../public/assets/svg/checkout/offerIcon.svg';

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
  padding: 0.5rem 0 0 0;
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

const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0;
  margin: 0;
  position: relative;
  color: ${(p) => p.theme.primaryColor};
  font-weight: 600;

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
  padding: 0.5rem 0;
`;

const OfferItemTitle = styled.h3`
  padding: 0.2rem 0;
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fafafa;
  color: #333533;
  font-weight: 400;
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const OfferCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const OfferCardBody = styled.div``;

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
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const offersData = useAppSelector(selectOffers);
  const { t } = useTranslation('page-checkout');

  const [isDropdown, setIsDropdown] = useState(false);
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
  const hanldeDropdownClick = async () => setIsDropdown(!isDropdown);

  return (
    <Wrapper>
      <StyledCheckoutTitle>{t('@promo')}</StyledCheckoutTitle>

      <Row>
        <Col xs={12}>
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

            <OffersContainer>
              <DropDownContainer onClick={hanldeDropdownClick}>
                <DropDown>
                  <OfferIcon>
                    <SvgOffer />
                  </OfferIcon>

                  <Title>View Offers</Title>
                </DropDown>
              </DropDownContainer>

              <OfferBody isDropdown={isDropdown}>
                {[
                  {
                    title: 'Available Offers',
                    offers: offers.filter((offer) => offer.order_type_ === 'FIRST' || offer.order_type_ === 'ALL'),
                  },
                  {
                    title: 'Other Offers',
                    offers: offers.filter((offer) => offer.order_type_ !== 'FIRST' && offer.order_type_ !== 'ALL'),
                  },
                ].map((offerItem, offerItemIndex) => {
                  if (!offerItem.offers.length) return null;

                  return (
                    <OfferItem>
                      <OfferItemTitle>{offerItem.title}</OfferItemTitle>

                      {offerItem.offers.map((offer, offerIndex) => (
                        <OfferCard>
                          <OfferCardBody>
                            <OfferCode>{offer.code}</OfferCode>

                            <OfferGetText>
                              Use code FLEKSA Get{' '}
                              {offer.offer_type_ === 'PERCENTAGE'
                                ? `${offer.provided}%`
                                : offer.offer_type_ === 'AMOUNT'
                                ? `${offer.provided} €`
                                : ''}{' '}
                              Off
                            </OfferGetText>

                            <OfferDescription>
                              {(offer.description_json && offer.description_json?.[language].length < 60) ||
                              moreDescription === `desc-${offerItemIndex}${offerIndex}` ? (
                                <>
                                  {`${offer.description_json?.[language]} `}

                                  {moreDescription === `desc-${offerItemIndex}${offerIndex}` && (
                                    <span onClick={async () => await handleDescriptionMoreClick('')}>Less</span>
                                  )}
                                </>
                              ) : (
                                <>
                                  {offer.description_json?.[language].slice(0, 60)}
                                  <span onClick={async () => await handleDescriptionMoreClick(`desc-${offerItemIndex}${offerIndex}`)}>
                                    {' '}
                                    ... More
                                  </span>
                                </>
                              )}
                            </OfferDescription>
                          </OfferCardBody>

                          <OfferApplyButton onClick={async () => await hanldePromoCodeClick(offer.code)}>Use Code</OfferApplyButton>
                        </OfferCard>
                      ))}
                    </OfferItem>
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

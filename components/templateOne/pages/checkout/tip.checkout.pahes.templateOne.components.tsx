import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { useState } from 'react';

import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import { selectTip, updateTip } from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import formatCurrency from '../../../../utils/formatCurrency';
import SvgTip from '../../../../public/assets/svg/checkout/tipIcon.svg';

const Wrapper = styled.div`
  padding-top: 0.5rem;
`;

const TipOptionsList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0 -8px;
`;

const TipOptionsItem = styled.div<{ isSelected: boolean }>`
  margin: 7px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  overflow: hidden;
  width: 80px;

  ${(props) =>
    props.isSelected &&
    css`
      border-color: ${(props) => props.theme.primaryColor};
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    `}

  p {
    margin: 0;
    width: 100%;
    cursor: pointer;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    text-align: center;

    @media (max-width: ${BREAKPOINTS.sm}px) {
      font-size: 14px;
      padding: 0.5rem 0;
    }
  }

  span {
    padding: 0.4rem 0 0 0.3rem;
    position: absolute;
  }

  input {
    display: flex;
    flex: 1;
    padding-left: 1.5rem;
    font-size: inherit;
    border: none;
    outline: none;
    overflow: hidden;
    height: 100%;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    span {
      padding: 0.5rem 0.2rem 0.5rem 0.5rem;
    }
  }
`;

const Title = styled.p`
  display: flex;

  margin: 0;
  font-weight: 600;

  span {
    font-weight: 600;
  }
`;

const TipTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TipIconContainer = styled.div`
  margin-right: 0.5rem;
  display: grid;
  place-items: center;

  svg {
    width: 24px;
    height: 24px;
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

const TipTitleBodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const tipPercentage = [
  [5, 10, 20],
  [10, 20, 30],
];

const CheckoutPageTip: FunctionComponent = ({}) => {
  const tipData = useAppSelector(selectTip);
  const cartData = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(selectLanguageCode);
  const { t } = useTranslation('page-checkout');
  const [otherTip, setOtherTip] = useState(false);
  const [otherTipAmount, setOtherTipAmount] = useState<number | null>(null);

  const tipOptions = tipPercentage[cartData.cartCost > 10 ? 0 : 1].map((percent) => Math.ceil((cartData.cartCost * percent) / 100));

  function onChangeTip(amount: number | null) {
    if (amount === null || amount >= 0) dispatch(updateTip(amount));
  }

  return (
    <Wrapper>
      <TipTitleContainer>
        <TipTitleBodyContainer>
          <TipIconContainer>
            <SvgTip />
          </TipIconContainer>

          <Title>{t('@tip')}</Title>

          {!!tipData && tipData > 0 && (
            <RemovePromo onClick={() => dispatch(updateTip(0))}>
              <SvgCrossImage src="/assets/svg/cross.svg" />
            </RemovePromo>
          )}
        </TipTitleBodyContainer>

        {!!tipData && tipData > 0 && <Price>{formatCurrency(tipData, languageCode)}</Price>}
      </TipTitleContainer>

      {tipData && tipData > 0 ? (
        <></>
      ) : (
        <TipOptionsList>
          {tipOptions.map((amount, index) => {
            const isSelected = amount === tipData;
            return (
              <TipOptionsItem
                key={index}
                isSelected={isSelected}
                onClick={() => {
                  setOtherTip(false);
                  onChangeTip(isSelected ? null : amount);
                  amplitudeEvent(constructEventName(`tip selection`, 'button'), {
                    amount,
                  });
                }}
              >
                <p>{formatCurrency(amount, languageCode)}</p>
              </TipOptionsItem>
            );
          })}

          <TipOptionsItem key="custom" isSelected={otherTip}>
            {otherTip ? (
              <>
                <span>€</span>
                <input
                  onBlur={() => {
                    amplitudeEvent(constructEventName(`tip selection`, 'input'), {
                      tipData,
                    });

                    onChangeTip(otherTipAmount);
                  }}
                  autoFocus
                  type="number"
                  value={otherTipAmount ?? ''}
                  onChange={(e) => {
                    if (!Number(e.target.value)) return setOtherTipAmount(null);

                    setOtherTipAmount(Number(e.target.value) ?? null);
                  }}
                />
              </>
            ) : (
              <p
                onClick={() => {
                  if (!otherTip) setOtherTip(true);

                  amplitudeEvent(constructEventName(`tip selection`, 'button'), {
                    otherTip,
                  });
                }}
              >
                {t('@other')}
              </p>
            )}
          </TipOptionsItem>
        </TipOptionsList>
      )}
    </Wrapper>
  );
};

export default CheckoutPageTip;

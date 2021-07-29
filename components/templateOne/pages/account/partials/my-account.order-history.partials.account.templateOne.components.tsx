import React, { FunctionComponent, useState } from 'react';
import { IParticularOrder } from '../../../../../interfaces/common/customer.common.interfaces';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';
import { useTranslation } from 'next-i18next';
import NodeApiHttpGetUserParticularOrder from '../../../../../http/nodeapi/account/get.order-view-by-id.nodeapi.http';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks.redux';
import { selectBearerToken } from '../../../../../redux/slices/user.slices.redux';
import { selectConfiguration } from '../../../../../redux/slices/configuration.slices.redux';
import LoadingIndicator from '../../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import { updateCheckout } from '../../../../../redux/slices/checkout.slices.redux';
import { updateError } from '../../../../../redux/slices/common.slices.redux';

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  @media (min-width: 850px) {
    max-width: 700px;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 1rem 0.5rem;
  }
`;
const TextContainer = styled.div`
  border-bottom: none;

  padding: 1em 2em 3em 2em;
  display: flex;
  justify-content: space-between;

  & > * {
    display: flex;
    flex-direction: column;
  }
`;
const Left = styled.div``;
const OrderId = styled.a`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  font-weight: 700;
  margin-bottom: 0.5em;
  text-decoration: none;
`;
const Type = styled.p`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.4em;
  padding: 0;
  margin: 0;
`;
const Quantity = styled(Type)``;
// const Status = styled(Type)``;
const Right = styled.div`
  align-items: center;
`;
const Price = styled.h2`
  color: ${(p) => p.theme.primaryColor};
  font-size: 2rem;
  font-size: 700;
  padding: 0;
  margin: 0;
`;
const TimeDate = styled(Type)``;
const Dot = styled.span`
  font-size: 1.5rem;
  margin: 0 0.1em;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.a`
  background-color: white;
  border: 1px solid ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textDarkColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1em;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  border-bottom-left-radius: 10px;

  &:nth-child(2):hover {
    filter: brightness(1.3);
  }
`;
const ReOrderButton = styled.button<{ back: string }>`
  background-color: ${(p) => (p.back ? p.theme.textDarkColor : 'white')};
  border: 1px solid ${(p) => p.theme.textDarkColor};
  color: ${(p) => (!p.back ? p.theme.textDarkColor : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1em;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  border-bottom-right-radius: 10px;
`;

interface IMyAccountOrderProps {
  order: IParticularOrder;
}

export const MyAccountOrder: FunctionComponent<IMyAccountOrderProps> = ({ order }) => {
  const customDate = new Date(`${order.created_at}`);
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);

  const { t } = useTranslation('account');
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleReorderButtonClick = async () => {
    try {
      setLoading(true);
      const response = await new NodeApiHttpGetUserParticularOrder(configuration, bearerToken as any).get({
        order_id: order.id,
      });

      if (!response || !response.result)
        return dispatch(
          updateError({
            show: true,
            message: 'Re-order is not possible at the moment.',
            severity: 'error',
          }),
        );

      dispatch(
        updateCheckout({
          orderType: response.data?.order.order_type,
          paymentMethod: response?.data?.order.payment_method,
          wantAt: response.data?.order.want_at,
          selectedAddressId: response.data?.order.is_delivery ? response.data?.order.delivery_address?.id : null,
          deliveryFinances: {
            charges: response.data?.order.is_delivery ? response.data?.order.price.delivery_fee : null,
          },
        }),
      );

      console.log('respon ', response);
      setLoading(false);
    } catch (e) {
      console.error('error => ', e);
    }
  };

  return (
    <Container>
      <TextContainer>
        <Left>
          <OrderId href={`/account/order/${order.id}`}>
            {t('@order')} #{order.id}
          </OrderId>
          <Type>{order.order_type}</Type>
          <Quantity>
            {order.no_of_products} {t('@items')}
          </Quantity>
          {/* <Status>{order.payment_status ? order.payment_status :  'UNPAID' }</Status> */}
        </Left>
        <Right>
          <Price>&euro; {order.amount.toFixed(2).replace('.', ',')}</Price>
          <TimeDate>
            {customDate.toLocaleString('default', {
              hour12: false,
              timeStyle: 'short',
            })}
            <Dot>.</Dot>
            {customDate.toLocaleString('default', { dateStyle: 'medium' })}
          </TimeDate>
        </Right>
      </TextContainer>

      <ButtonContainer>
        <Button href={`/account/order/${order.id}`}>{t('@review-now')}</Button>
        <ReOrderButton back="fill" onClick={handleReorderButtonClick}>
          {loading ? <LoadingIndicator width={20} /> : t('@re-order')}
        </ReOrderButton>
      </ButtonContainer>
    </Container>
  );
};

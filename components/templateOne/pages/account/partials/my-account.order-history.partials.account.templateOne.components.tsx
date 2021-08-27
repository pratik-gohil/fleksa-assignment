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
import moment from 'moment';
import CustomLink from '../../../common/amplitude/customLink';
import { amplitudeEvent, constructEventName } from '../../../../../utils/amplitude.util';
import { updateBulkProduct } from '../../../../../redux/slices/cart.slices.redux';
import { ILanguageData } from '../../../../../interfaces/common/language-data.common.interfaces';
import { IIndexSliceStateSideProducts } from '../../../../../redux/slices/item-selection.slices.redux';
import { useRouter } from 'next/router';

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

const Button = styled.button<{ isOnlyReOrder: boolean }>`
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
  transition: background 0.25s linear;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: ${(p) => (p.isOnlyReOrder ? '0px' : '10px')};

  &:nth-child(2):hover {
    filter: brightness(1.3);
  }

  &:hover,
  &:focus {
    background: ${(p) => p.theme.textDarkColor};
    color: #fff;
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

interface IModifyChoiceState
  extends Record<
    number,
    {
      product_index: number;
      top_index: number;
      name: ILanguageData;
    }
  > {}

function generateTempCartId(productId: number, sideProducts: IIndexSliceStateSideProducts, choice: IModifyChoiceState): string {
  const sideProdStr = Object.keys(sideProducts).join('-');
  const choiceStr = Object.keys(choice)
    .map((key) => `${key},${choice[Number(key)]?.product_index}`)
    .join('-');

  return `${productId}|${sideProdStr}|${choiceStr}`;
}

export const MyAccountOrder: FunctionComponent<IMyAccountOrderProps> = ({ order }) => {
  const customDate = new Date(`${order.created_at}`);
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);
  const router = useRouter();

  const { t } = useTranslation('account');
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleReorderButtonClick = async () => {
    try {
      setLoading(true);
      // amplitudeEvent(constructEventName(`reorder`, 'button'), {});

      const response = await new NodeApiHttpGetUserParticularOrder(configuration, bearerToken as any).get({
        order_id: order.id,
      });

      if (!response || !response.result) {
        amplitudeEvent(constructEventName(`reorder error`, 'response'), response);
        return dispatch(
          updateError({
            show: true,
            message: 'Re-order is not possible at the moment.',
            severity: 'error',
          }),
        );
      }

      // TODO: Update basic checkout info
      dispatch(
        updateCheckout({
          orderType: response.data?.order.order_type,
          tip: response.data?.order.price.tip,
          paymentMethod: response?.data?.order.payment_method,
          wantAt: null,
          selectedAddressId: response.data?.order.is_delivery ? response.data?.order.delivery_address?.id : null,
          deliveryFinances: response.data?.order.is_delivery
            ? {
                charges: response.data?.order.price.delivery_fee ?? null,
              }
            : null,
        }),
      );

      const cartItems: Record<string, any> = {};

      // TODO: Update cart by product info
      response.data?.order.products.forEach((product) => {
        const sideProducts: Record<number, { price: number; name: ILanguageData }> = {}; // ? Item selection state format
        const choices: IModifyChoiceState = {}; // ? Item selection and cart state format

        const cartItem = {
          topProductId: 0,
          cartId: '',
          id: product.id,
          mainName: {},
          partName: {},
          type: product.type === 'PART' ? 'MULTIPLE' : product.type,
          quantity: product.quantity,
          costOneItem: product.price,
          totalCost: product.price * product.quantity,
        };

        product.name.forEach((selection) => {
          switch (selection.type) {
            case 'SIDE':
              sideProducts[selection.id as number] = {
                price: selection?.extra_price as number,
                name: selection.name,
              };
              break;
            case 'CHOICE':
              choices[selection.top_index as number] = {
                top_index: selection.top_index as number,
                name: selection.name,
                product_index: selection.product_index as number,
              };
              break;
            case 'PART':
              cartItem.partName = selection.name;
              break;
            case 'PART-PARENT': {
              cartItem.topProductId = selection.id as number;
              cartItem.mainName = selection.name;
              break;
            }
            case 'SINGLE': {
              cartItem.topProductId = selection.id as number;
              cartItem.mainName = selection.name;
              break;
            }
            default:
          }
        });

        // Generate CartId
        cartItem.cartId = generateTempCartId(cartItem.id, sideProducts, choices);

        cartItems[cartItem.cartId] = {
          ...cartItem,
          sideProducts: product.name.filter((p) => p.type === 'SIDE').map((s) => ({ id: s.id as number, name: s.name })), // ? Converting ItemSelection -> Cart state format
          choice: Object.values(choices),
        };
      });

      console.log('cart Items : ', cartItems);

      // TODO: Update the cart for all the product at once
      dispatch(updateBulkProduct(cartItems));

      // amplitudeEvent(constructEventName(`reorder success`, 'response'), response);

      console.log('respon ', response.data?.order.products);
      setLoading(false);

      router.push(`/checkout`);
    } catch (e) {
      amplitudeEvent(constructEventName(`reorder error catch`, 'error'), { error: e });

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
        </Left>

        <Right>
          <Price>&euro; {order.amount.toFixed(2).replace('.', ',')}</Price>
          <TimeDate>
            {moment(customDate).format('HH:mm')}
            <Dot>.</Dot>
            {moment(customDate).format('ll')}
          </TimeDate>
        </Right>
      </TextContainer>

      <ButtonContainer>
        <Button isOnlyReOrder={!!order.is_reorder}>
          <CustomLink
            amplitude={{
              type: 'button',
              text: t('@review-now'),
            }}
            href={`/account/order/${order.id}`}
          >
            {t('@review-now')}
          </CustomLink>
        </Button>

        {!!order.is_reorder && (
          <ReOrderButton back="fill" onClick={handleReorderButtonClick}>
            {loading ? <LoadingIndicator width={20} /> : t('@re-order')}
          </ReOrderButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

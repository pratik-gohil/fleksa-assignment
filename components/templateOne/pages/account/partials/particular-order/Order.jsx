import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, InnerContainer } from '../../../GlobalStyle';

import styled from 'styled-components';
import DateTime from './DateTime.particular-order.partial';
import DeliveryFee from './DeliveryFee';
import Tip from './Tip';
import Subtotal from './Subtotal';
import Total from './Total';
import PaymentMethod from './PaymentMethod';
import DeliveryTime from './DeliveryTime';
import DeliveryAddress from './DeliveryAddress.particular-order.partials';
import OrderType from './OrderType';
import DownloadButton from './DownloadButton';
import Products from './Products.particular-order.partial';
import OfferAmount from './OfferAmount';
// import Tax from './Tax';

const Order = ({ order_id }) => {
  const id = +order_id;
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = window.localStorage.getItem('user_token') || '';

      const response = await axios({
        method: 'GET',
        url: `/v2/order/view/${id}`,
        headers: {
          Authorization: token,
        },
      });

      setOrder(response.data.data.order);
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  return !loading ? (
    <OrderContainer>
      <OrderInnerContainer>
        <Left>
          <DateTime created_at={order.created_at} />

          <Products products={order.products} />

          {order.is_delivery && <DeliveryFee fee={order.price?.delivery_fee} />}

          <Tip tip={order.price?.tip} />

          <Subtotal sub_total={order.price?.sub_total} />

          <OfferAmount offer={order.price?.discount} />
          <Total total={order.price?.total_amount} />
        </Left>

        <Right>
          <Top>
            <OrderType order_type={order.order_type} />

            {order.is_delivery && <DeliveryAddress delivery_address={`${order.delivery_address.address},${order.delivery_address.city}`} />}
            {order.is_delivery && <DeliveryTime delivery_time={order.want_at} />}

            <PaymentMethod payment_method={order.payment_method} />
          </Top>

          <Bottom>
            <DownloadButton pdf={order.pdf_url} />
          </Bottom>
        </Right>
      </OrderInnerContainer>
    </OrderContainer>
  ) : null;
};

const OrderContainer = styled(Container)`
  flex: 1;
  background-color: white;

  @media (min-width: 850px) {
    padding: 3em 0;
    height: ${(p) => `calc(100vh - ${p.theme.desktop_nav_height})`};
    overflow: scroll;
  }
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const OrderInnerContainer = styled(InnerContainer)`
  max-width: 1000px;

  @media (min-width: 1200px) {
    display: flex;
    gap: 2em;

    & > * {
      flex: 1;
    }
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Left = styled.div``;
const Top = styled.div``;
const Bottom = styled.div``;

export default Order;

import moment from 'moment';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import MobileBackButton from '../../common/backButton/backButton.common.templateOne.components';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  display: flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const MainSection = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: #fff;
  max-height: 600px;
  margin: auto 2rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  padding: 2rem;
  border-radius: 10px;

  @media (min-width: 1200px) {
    display: flex;
    gap: 2em;

    & > * {
      flex: 1;
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 1rem;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeftContainer = styled.div``;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
  width: 50%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1rem;
  }
`;
const Value = styled.p`
  text-align: right;
  padding: 0;
  margin: 0;
  width: 50%;
`;

const ProductContainer = styled.div``;
const Product = styled(Content)`
  justify-content: space-between;
`;
const ProductName = styled.div`
  width: 60%;
`;
const ProductQuantity = styled.div`
  padding: 0.5rem 1rem;
  width: 15%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0.5rem;
  }
`;
const ProductPrice = styled.div`
  padding: 0.5rem 0;
  width: 25%;
  text-align: right;
`;

const MainName = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
`;
const SubName = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 400;
  font-size: 1rem;
`;

const PriceContainer = styled.div`
  border-top: 0.1px solid rgba(0, 0, 0, 0.5);
  padding: 0.5rem 0;
`;

const PriceLabel = styled(Label)`
  font-weight: 400;
  font-size: 1rem;
`;
const BasePrice = styled(Content)`
  padding: 0.5rem 0;
`;
const PriceValue = styled(Value)`
  font-size: 1rem;
  font-weight: 500;
`;
const ReceiptButton = styled.a`
  background: ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textLightActiveColor};
  width: 100%;
  text-align: center;
  padding: 1.5rem 0;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #575757;
  }
`;

const SetGap = styled.hr`
  height: 0.5rem;
  border: none;
  outline: none;
`;

const AccountPageParticularOrder: FunctionComponent = ({}) => {
  const order = useAppSelector(selectCustomer).current_order;

  return (
    <Wrapper>
      <MobileBackButton path="/account/order-history" title={`Order #${order?.id}`} />

      <MainSection>
        <ReceiptButton href={order?.pdf_url} target="_blank" rel="noopener noreferrer">
          View Receipt
        </ReceiptButton>
        <Container>
          <LeftContainer>
            <Content>
              <Label>Placed On</Label>
              <Value>
                {moment(new Date(`${order?.created_at}`)).format('ll')} at {moment(new Date(`${order?.created_at}`)).format('HH:mm')}
              </Value>
            </Content>

            <SetGap />

            <ProductContainer>
              {order?.products.map((product, index) => (
                <Product key={index}>
                  <ProductName>
                    <MainName>{product.name.map((p) => (p.isRoot ? `${p.name.german} ` : ''))}</MainName>
                    <SubName>{product.name.map((p) => (!p.isRoot ? p.name.german : '').toString())}</SubName>
                  </ProductName>
                  <ProductQuantity>X{product.quantity}</ProductQuantity>
                  <ProductPrice>{(product.quantity * product.price).toFixed(2).replace('.', ',')} &euro;</ProductPrice>
                </Product>
              ))}
            </ProductContainer>

            <SetGap />

            <PriceContainer>
              {!!order?.price.tip && (
                <BasePrice>
                  <PriceLabel>Tip</PriceLabel>
                  <PriceValue>{order?.price.tip.toFixed(2).replace('.', ',')} €</PriceValue>
                </BasePrice>
              )}

              {!!order?.price.delivery_fee && (
                <BasePrice>
                  <PriceLabel>Delivery Fee</PriceLabel>
                  <PriceValue>{order?.price.delivery_fee.toFixed(2).replace('.', ',')} €</PriceValue>
                </BasePrice>
              )}

              <BasePrice>
                <PriceLabel>Subtotal</PriceLabel>
                <PriceValue>{order?.price.sub_total.toFixed(2).replace('.', ',')} €</PriceValue>
              </BasePrice>

              <BasePrice>
                <PriceLabel
                  style={{
                    fontWeight: 500,
                    fontSize: '1.2rem',
                  }}
                >
                  Total
                </PriceLabel>
                <PriceValue
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {order?.price.total_amount.toFixed(2).replace('.', ',')} €
                </PriceValue>
              </BasePrice>
            </PriceContainer>
          </LeftContainer>

          <RightContainer>
            <Content>
              <Label>Order Type</Label>
              <Value>{order?.order_type}</Value>
            </Content>

            <SetGap />

            {order?.is_delivery && (
              <>
                <Content>
                  <Label>Delivery Address</Label>
                  <Value>
                    {order?.delivery_address?.address}, {order?.delivery_address?.city}
                  </Value>
                </Content>
                <SetGap />
              </>
            )}

            {order?.is_delivery && (
              <>
                <Content>
                  <Label>Delivery Time</Label>
                  <Value>
                    {moment(new Date(`${order?.delivered_at}`)).format('ll')} at {moment(new Date(`${order?.delivered_at}`)).format('HH:mm')}
                  </Value>
                </Content>
                <SetGap />
              </>
            )}

            <Content>
              <Label>Payment Method</Label>
              <Value>{order?.payment_method}</Value>
            </Content>
          </RightContainer>
        </Container>
      </MainSection>
    </Wrapper>
  );
};

export default AccountPageParticularOrder;

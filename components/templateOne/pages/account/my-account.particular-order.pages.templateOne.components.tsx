import moment from 'moment';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import ArrowIconPath from '../../../../public/assets/svg/back-arrow.svg';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  max-height: 50px;
  padding: 2.5rem 2rem;
  align-items: center;
`;

const OrderId = styled.h3`
  padding: 0;
  margin: 0 0 0 1rem;
`;
const BackButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
const ArrowIcon = styled(ArrowIconPath)``;

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
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
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
`;
const ProductPrice = styled.div`
  padding: 0.5rem 0;
  width: 20%;
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
const ReceiptButton = styled.button`
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
      <HeaderSection>
        <BackButton>
          <ArrowIcon />
        </BackButton>
        <OrderId>Order #18234</OrderId>
      </HeaderSection>

      <MainSection>
        <ReceiptButton>View Receipt</ReceiptButton>
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
              <Product>
                <ProductName>
                  <MainName>Pizza Mittagsangebot</MainName>
                  <SubName>Pizza Peperoniwurstmit Ananasmit Artischocken</SubName>
                </ProductName>
                <ProductQuantity>x3</ProductQuantity>
                <ProductPrice>23,40 €</ProductPrice>
              </Product>
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

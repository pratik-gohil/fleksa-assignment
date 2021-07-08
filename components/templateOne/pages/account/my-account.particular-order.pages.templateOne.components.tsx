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
  justify-content: space-between;
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
const SetGap = styled.hr`
  height: 0rem;
  border: none;
  outline: none;
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

const AccountPageParticularOrder: FunctionComponent = ({}) => {
  const customerData = useAppSelector(selectCustomer);

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
                {moment(new Date(`${customerData.current_order?.created_at}`)).format('ll')} at{' '}
                {moment(new Date(`${customerData.current_order?.created_at}`)).format('HH:mm')}
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
              <BasePrice>
                <PriceLabel>Tip</PriceLabel>
                <PriceValue>2,00 €</PriceValue>
              </BasePrice>

              <BasePrice>
                <PriceLabel>Delivery Fee</PriceLabel>
                <PriceValue>1,00 €</PriceValue>
              </BasePrice>

              <BasePrice>
                <PriceLabel>Subtotal</PriceLabel>
                <PriceValue>23,40 €</PriceValue>
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
                  25,40 €
                </PriceValue>
              </BasePrice>
            </PriceContainer>
          </LeftContainer>
          <RightContainer>
            <Content>
              <Label>Order Type</Label>
              <Value>{customerData.current_order?.order_type}</Value>
            </Content>

            <SetGap />

            <Content>
              <Label>Delivery Address</Label>
              <Value>Gerberstraße ,Offenbach am Main</Value>
            </Content>

            <SetGap />

            <Content>
              <Label>Delivery Time</Label>
              <Value>May 13, 2021 at ca. 23:15</Value>
            </Content>

            <SetGap />

            <Content>
              <Label>Payment Method</Label>
              <Value>{customerData.current_order?.payment_method}</Value>
            </Content>
          </RightContainer>
        </Container>
      </MainSection>
    </Wrapper>
  );
};

export default AccountPageParticularOrder;

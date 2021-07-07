import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IParticularProduct } from '../../../../../../interfaces/common/customer.common.interfaces';

interface IProductsParticualOrderProps {
  products: Array<IParticularProduct>;
}

const ProductsPartialOrder: FunctionComponent<IProductsParticualOrderProps> = ({ products }) => {
  return (
    <Container>
      <InnerContainer>
        {products &&
          products.map((product) => (
            <ProductContainer key={product.id}>
              <Left>
                <NameContainer>
                  <Name>{product.name?.map((p) => (p.isRoot ? p.name.german : 'Product'))}</Name>
                  <SubName>{product.name?.map((p) => (!p.isRoot ? p.name.german : 'Sub-Product').toString())}</SubName>
                </NameContainer>
                <Quantity>X{product.quantity}</Quantity>
              </Left>

              <Right>
                <Price>{(product.quantity * product.price).toFixed(2).replace('.', ',')} &euro;</Price>
              </Right>
            </ProductContainer>
          ))}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 1.5em;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5em;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

const Right = styled.div``;
const Price = styled.p``;
const NameContainer = styled.div``;
const InnerContainer = styled.div``;

const Name = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  flex-direction: column;
  display: block;
  color: ${(p) => p.theme.textDarkColor};
  padding: 0;
  margin: 0;
`;

const SubName = styled.h1`
  font-size: 0.9rem;
  font-weight: 500;
  flex-direction: column;
  display: block;
  color: ${(p) => p.theme.textDarkColor};
  padding: 0;
  margin: 0;
`;

const Quantity = styled.div`
  color: ${(p) => p.theme.textDarkColor};
  margin-left: 0.5em;
  font-weight: 800;
`;

export default ProductsPartialOrder;

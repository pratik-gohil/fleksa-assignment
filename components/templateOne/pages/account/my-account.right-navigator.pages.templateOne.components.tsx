import React from 'react';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 2em;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;
const Value = styled.p`
  color: ${(p) => p.theme.textLightColor};
  font-size: 1.3rem;
  padding: 0;
  margin: 0;
`;
const TextContainer = styled.div``;

export const MyAccountRightSection = () => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <Wrapper>
      <Content>
        <TitleContainer>
          <Title>Name</Title>
          {/* {update && (
                  <ChangeButtonContainer>
                    <ChangeButton onClick={() => setUpdateName(true)}>
                      <PencilIcon />
                    </ChangeButton>
                  </ChangeButtonContainer>
                )} */}
        </TitleContainer>
        <TextContainer>
          <Value>{customerData.name}</Value>
        </TextContainer>
      </Content>

      {/* <ul>
        <li>
          <h3>Name</h3>
          <p>{customerData.name}</p>
        </li>
        <li>
          <h3>Email</h3>
          <p>{customerData.email || 'N/A'}</p>
        </li>
        <li>
          <h3>Phone Number</h3>
          <p>
            +{customerData.country_code} {customerData.phone}
          </p>
        </li>
      </ul> */}
    </Wrapper>
  );
};

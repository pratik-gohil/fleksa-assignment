import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-grid-system';

const Wrapper = styled.div``;
const Label = styled.p`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 600;
  padding: 0 0 0.4rem 0;
  margin: 0;
`;

const SelectBox = styled.select`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 300;
  outline: none;
  display: flex;
  align-items: center;
  height: 100%;
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 2rem !important;
`;
const Option = styled.option``;

const InputBox = styled.div`
  padding: 0.8rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;
const InputBoxDateTime = styled(InputBox)`
  margin: 0 0.5rem;
`;
const ChoosenTime = styled.p`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  padding: 0;
  margin: 0;
`;
const DateTimeInput = styled.input`
  padding: 0;
  margin: 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
`;
const SlotContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 1rem 0 0.5rem 0;
  border-radius: 4px;
  background: #fff;
`;
const TimeSlots = styled.div`
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 0 0.5rem;
  display: flex;
  transition: all 0.1s ease;
  overflow-x: hidden;
  max-height: 500px;

  @media (max-width: 576px) {
    max-width: 100%;
    padding: 1rem 0 0 0rem;
  }
`;
const Slot = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 60px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;

  border-color: ${(p) => (p.active && !p.break ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)')};
  cursor: ${(p) => (p.break ? 'not-allowed' : 'pointer')};
  color: ${(p) => (p.break ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,1)')};

  @media (max-width: 576px) {
    width: 50px;
    height: 40px;
  }
`;

const FormRightInputs = () => {
  return (
    <Wrapper>
      <Container fluid>
        <Label>No. of Guests & Date - Time​</Label>
        <Row nogutter>
          <Col xl={3}>
            <SelectBox>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, '20+'].map((r) => (
                <Option value={r}>{r}</Option>
              ))}
            </SelectBox>
          </Col>
          <Col xl={6}>
            <InputBoxDateTime>
              <DateTimeInput type="date" value="2020-12-31" />
            </InputBoxDateTime>
          </Col>
          <Col xl={3}>
            <InputBox>
              <ChoosenTime>18:50</ChoosenTime>
            </InputBox>
          </Col>
        </Row>
        <Row nogutter>
          <SlotContainer>
            <TimeSlots>
              {['12:00', '12:45', '01:30', '02:15', '03:00', '03:45', '04:30', '12:00', '12:45', '01:30', '02:15', '03:00', '03:45', '04:30'].map(
                (time) => (
                  <Slot>{time}</Slot>
                ),
              )}
            </TimeSlots>
          </SlotContainer>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default FormRightInputs;

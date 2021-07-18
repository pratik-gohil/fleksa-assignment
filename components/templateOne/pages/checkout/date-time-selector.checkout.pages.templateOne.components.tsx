import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectOrderType, selectWantAt, updateShowDateTimeSelect, updateWantAt } from '../../../../redux/slices/checkout.slices.redux';
import { selectAddress, selectTimings } from '../../../../redux/slices/index.slices.redux';
import RestaurantTimingUtils, { ILabelValue } from '../../../../utils/restaurant-timings.utils';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const ContentContainerView = styled.div`
  max-width: 500px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  background-color: #fff;
  margin: ${(props) => props.theme.dimen.X4}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const Title = styled.h3`
  padding: ${(props) => props.theme.dimen.X4}px ${(props) => props.theme.dimen.X4 * 2}px;
  margin: 0;
  border-bottom: ${(props) => props.theme.border};
`;

const Item = styled.div`
  padding: ${(props) => props.theme.dimen.X4}px ${(props) => props.theme.dimen.X4 * 2}px;
`;

const Text = styled.p`
  font-weight: 600;
  margin: 0;
`;

const Done = styled.button`
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  background: ${(props) => props.theme.primaryColor};
  padding: ${(props) => props.theme.dimen.X4}px;
  margin-bottom: ${(props) => props.theme.dimen.X4}px;
  width: 100%;
  font-weight: 700;
  font-size: inherit;
  line-height: 1;
  cursor: pointer;
`;

const timings = new RestaurantTimingUtils();

const CheckoutDateTime: FunctionComponent = ({}) => {
  const dispatch = useAppDispatch();
  const wantAtData = useAppSelector(selectWantAt);
  const addressData = useAppSelector(selectAddress);
  const timingsData = useAppSelector(selectTimings);
  const orderType = useAppSelector(selectOrderType);
  const [selectedDate, setSelectedDate] = useState<ILabelValue | null>(wantAtData?.date || null);
  const [datesList] = useState<Array<ILabelValue>>(timings.generateDates());
  const [timeList, setTimeList] = useState<Array<ILabelValue>>();

  useEffect(() => {
    if (selectedDate && timingsData && orderType && addressData?.prepare_time && addressData?.delivery_time) {
      const timeData = timings.generateTimeList({
        date: selectedDate,
        timingsData,
        type: orderType,
        interval: {
          pickup_time: addressData?.prepare_time,
          delivery_time: addressData?.delivery_time,
        },
      });
      if (datesList[0].value === selectedDate.value && timeData[0]) {
        timeData[0].label = "As soon as possible"
      }
      setTimeList(timeData);
      dispatch(updateWantAt(null))
    }
  }, [selectedDate, timingsData, orderType, addressData?.prepare_time, addressData?.delivery_time]);

  return (
    <Wrapper>
      <ContentContainerView>
        <Title>When would you like your order</Title>
        <Item>
          <Text>Choose a date</Text>
          <Select value={selectedDate} options={datesList} onChange={(value) => setSelectedDate(value)} />
        </Item>
        <Item>
          <Text>Choose a time</Text>
          <Select
            value={wantAtData?.time || null}
            options={timeList}
            onChange={(value) => dispatch(updateWantAt({ date: selectedDate, time: value }))}
          />
        </Item>
        <Item>
          <Done onClick={() => dispatch(updateShowDateTimeSelect(false))}>DONE</Done>
        </Item>
      </ContentContainerView>
    </Wrapper>
  );
};

export default CheckoutDateTime;

import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { IAddress } from '../../../../interfaces/common/address.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import {
  selectOrderType,
  selectWantAt,
  updateCheckoutIsPreOrder,
  updateCheckoutIsSofort,
  updateShowDateTimeSelect,
  updateWantAt,
} from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import { selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectSiblings, selectTimings } from '../../../../redux/slices/index.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
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
  const { t } = useTranslation('page-checkout');
  const dispatch = useAppDispatch();

  const shopData = useAppSelector(selectShop);
  const address = useAppSelector(selectAddress);
  const wantAtData = useAppSelector(selectWantAt);
  const siblings = useAppSelector(selectSiblings);
  const timingsData = useAppSelector(selectTimings);
  const orderType = useAppSelector(selectOrderType);
  const currentLanguage = useAppSelector(selectLanguage);
  const selectedMenuId = useAppSelector(selectSelectedMenu);

  const [selectedDate, setSelectedDate] = useState<ILabelValue | null>(wantAtData?.date || null);
  const [datesList] = useState<Array<ILabelValue>>(timings.generateDates());
  const [timeList, setTimeList] = useState<Array<ILabelValue>>();
  const [addressData, setAddressData] = useState<IAddress | null | undefined>(undefined);

  /**
   * Setup selected multi restaurant address information to the local state
   */
  useEffect(() => {
    if (shopData?.id == selectedMenuId) setAddressData(address);
    else setAddressData(siblings.find((item) => item.id == selectedMenuId)?.address);
  }, []);

  /**
   * Initial date time list calculation and update the state
   */
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
        language: currentLanguage,
      });

      setTimeList(timeData);
      dispatch(updateWantAt(null));
    }
  }, [selectedDate, timingsData, orderType, addressData?.prepare_time, addressData?.delivery_time]);

  /**
   *
   * @param value ILabelValue | null
   * @description Updating selected date for place the order
   */
  const handleDateChangeDropDownClick = async (value: ILabelValue | null) => {
    setSelectedDate(value);

    // TODO: Check the selected date was today or future
    const isCurrentDate = moment(value?.value).isSame(new Date(), 'day');

    if (!isCurrentDate) dispatch(updateCheckoutIsPreOrder(true));
    else dispatch(updateCheckoutIsPreOrder(false));

    amplitudeEvent(constructEventName(`summary date selection`, 'model'), {
      prevSelected: selectedDate,
      currentSelected: value,
    });
  };

  /**
   *
   * @param value ILabelValue | null
   * @description Updating selected time for place the order
   */
  const handleTimeChangeDropDownClick = async (value: ILabelValue | null) => {
    dispatch(updateWantAt({ date: selectedDate, time: value }));
    dispatch(updateCheckoutIsSofort(value?.isSofort));
    dispatch(updateCheckoutIsPreOrder(!value?.isSofort));

    amplitudeEvent(constructEventName(`summary time selection`, 'model'), {
      prevSelected: wantAtData?.time,
      currentSelected: value,
    });
  };

  return (
    <Wrapper>
      <ContentContainerView>
        <Title>{t('@time-selection-model-title')}</Title>
        <Item>
          <Text>{t('@choose-date')}</Text>

          <Select value={selectedDate} options={datesList} onChange={handleDateChangeDropDownClick} />
        </Item>

        <Item>
          <Text>{t('@choose-time')}</Text>

          <Select value={wantAtData?.time || null} options={timeList} onChange={handleTimeChangeDropDownClick} />
        </Item>

        <Item>
          <Done
            onClick={() => {
              dispatch(updateShowDateTimeSelect(false));
              amplitudeEvent(constructEventName(`summary date time selection done button`, 'model'), {});
            }}
          >
            {t('@done-button')}
          </Done>
        </Item>
      </ContentContainerView>
    </Wrapper>
  );
};

export default CheckoutDateTime;

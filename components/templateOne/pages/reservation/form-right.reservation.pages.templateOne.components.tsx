import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-grid-system';
import RestaurantTimingUtils, { ILabelValue } from '../../../../utils/restaurant-timings.utils';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectAddress, selectTimings, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import moment from 'moment';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useTranslation } from 'next-i18next';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;
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

  @media (max-width: ${BREAKPOINTS.md}px) {
    padding: 1rem;
    text-align: center;
  }
`;
const Option = styled.option``;

const InputBox = styled.div<{
  visible?: boolean;
}>`
  padding: 0.8rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin: 1rem 0 0 0;
    display: ${(p) => (p.visible ? 'block' : 'none')};
  }
`;
const InputBoxDateTime = styled(InputBox)`
  margin: 0 0.5rem;
  display: block;

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin: 1rem 0 0 0;
  }
`;
const ChoosenTime = styled.p`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  padding: 0;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.md}px) {
    text-align: left;
  }
`;
const DateInput = styled.input`
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
  background: transparent;
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
  max-height: 400px;

  @media (max-width: ${BREAKPOINTS.md}px) {
    max-height: 200px;
    padding: 1rem 0 0 0;
  }
`;
const Slot = styled.div<{
  active: boolean;
  break?: boolean;
}>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 60px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  background: ${(p) => (p.active && !p.break ? 'rgba(0, 0, 0, 0)' : 'rgba(0,0,0,0.05)')};

  border-color: ${(p) => (p.active && !p.break ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)')};
  cursor: ${(p) => (p.break ? 'not-allowed' : 'pointer')};
  color: ${(p) => (p.break ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,1)')};

  &:hover {
    border-color: rgba(0, 0, 0, 1);
    background: rgba(0, 0, 0, 0);
  }

  @media (max-width: 576px) {
    width: 50px;
    height: 40px;
  }
`;

const IndigationText = styled.p`
  text-align: center;
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.4);
`;

const Dashed = styled.span`
  text-align: center;
  display: block;
`;

const SiblingContainer = styled.div`
  margin: 0 0 1rem 0;
  border-radius: 4px;
  & > * {
    padding: 1rem;
  }
`;

interface IFormRightInputsProps {
  date: string;
  time: ILabelValue;
  totalGuest: string;
  setTotalGuest: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setTime: React.Dispatch<React.SetStateAction<ILabelValue>>;
  setShopId: React.Dispatch<React.SetStateAction<number | null>>;
}

const timeUtils = new RestaurantTimingUtils();

const FormRightInputs = ({ time, date, totalGuest, setDate, setTime, setTotalGuest, setShopId }: IFormRightInputsProps) => {
  const { t } = useTranslation('reservation');

  const timingsData = useAppSelector(selectTimings);
  const addressData = useAppSelector(selectAddress);
  const currentLanguage = useAppSelector(selectLanguage);
  const siblings = useAppSelector(selectSiblings);

  const [timingList, setTimingList] = useState<ILabelValue[]>([]);
  const [shopName, setShopName] = useState('');

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    amplitudeEvent(constructEventName(`date out change`, 'input'), {
      prev: date,
      current: e.target.value,
    });
  };

  // TODO: this is called when user selects or changes  date
  useEffect(() => {
    if (!date || !addressData?.has_reservations) return;

    if (date && timingsData && addressData?.prepare_time && addressData?.delivery_time) {
      const timeData = timeUtils.generateTimeList({
        date: {
          value: moment(date).format().toUpperCase(),
          label: '',
        },
        timingsData,
        type: 'RESERVATION',
        interval: {
          pickup_time: addressData?.prepare_time,
          delivery_time: addressData?.delivery_time,
        },
        isReservation: true,
        language: currentLanguage,
      });

      if (timeData.length) {
        setTimingList(timeData);

        setTime({
          value: timeData[0]?.value || '-',
          label: '',
        });
      } else {
        setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'));
      } // ? Set next day if not exist
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Wrapper>
      <Container
        fluid
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <Label>{t('@guest')}​</Label>

        {siblings.length > 0 && (
          <Row nogutter>
            <Col xl={12}>
              <SiblingContainer>
                <SelectBox
                  value={shopName}
                  onChange={(e) => {
                    setShopName(e.target.value);

                    const selectedSibling = siblings.filter((s) => s.name === e.target.value)[0];

                    setShopId(selectedSibling.id);
                  }}
                >
                  {siblings.map((s, i) => (
                    <Option key={i} value={s.name}>
                      {s.name}
                    </Option>
                  ))}
                </SelectBox>
              </SiblingContainer>
            </Col>
          </Row>
        )}

        <Row nogutter>
          <Col xl={3} lg={3}>
            <SelectBox
              value={totalGuest}
              onChange={(e) => {
                setTotalGuest(e.target.value);

                amplitudeEvent(constructEventName(`guests`, 'input'), {
                  prev: totalGuest,
                  current: e.target.value,
                });
              }}
            >
              {['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '20+'].map(
                (r) => (
                  <Option key={r} value={r}>
                    {r}
                  </Option>
                ),
              )}
            </SelectBox>
          </Col>
          <Col xl={6} lg={6}>
            <InputBoxDateTime>
              <DateInput
                type="date"
                value={date}
                onChange={handleDateChange}
                onBlur={() =>
                  amplitudeEvent(constructEventName(`date out focus`, 'input'), {
                    date,
                  })
                }
              />
            </InputBoxDateTime>
          </Col>
          <Col xl={3} lg={3}>
            <InputBox visible={!!timingList.length}>
              {timingList.length ? <ChoosenTime>{time.value}</ChoosenTime> : <Dashed>-</Dashed>}
            </InputBox>
          </Col>
        </Row>
        <Row nogutter>
          <Col xl={12}>
            <SlotContainer>
              <TimeSlots>
                {timingList.map((t, i) => (
                  <Slot
                    key={i}
                    onClick={() => {
                      setTime(t);
                      amplitudeEvent(constructEventName(`time slot`, 'button'), {
                        time: t,
                      });
                    }}
                    active={time.value === t.value}
                    break={t.break}
                  >
                    {t.value}
                  </Slot>
                ))}
              </TimeSlots>
              <IndigationText>{timingList.length ? t('@choose-slot') : t('@not-available')}</IndigationText>
            </SlotContainer>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default FormRightInputs;

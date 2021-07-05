import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';
import { ITimingsDay } from '../../../../interfaces/common/shop.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectTimings } from '../../../../redux/slices/index.slices.redux';

const Wrapper = styled.div`
  padding: 2rem 0 0 1.5rem;
  height: 100%;

  border-left: 2px solid rgba(0, 0, 0, 0.1);
`;

export const BasicContactUsInformation = () => {
  const { t } = useTranslation('contact-us');

  const timings = useAppSelector(selectTimings);

  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map((day) => {
    if (timings === null) return;
    return {
      dayName: t(`@${day}`),
      time: (timings[day] as ITimingsDay).shop?.timings?.map((t) => `${t.open} - ${t.close}`).join(', '),
      available: (timings[day] as ITimingsDay).shop.availability,
    };
  });

  return (
    <Wrapper>
      {days.map((day) => (
        <p key={day?.dayName}>
          {day?.dayName} - {day?.time}
        </p>
      ))}
    </Wrapper>
  );
};

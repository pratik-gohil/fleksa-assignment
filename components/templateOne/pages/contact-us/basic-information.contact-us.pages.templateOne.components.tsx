import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { ITimingsDay } from '../../../../interfaces/common/shop.common.interfaces';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectAddress, selectShop, selectTimings } from '../../../../redux/slices/index.slices.redux';

import ArrowIconPath from '../../../../public/assets/svg/next.svg';
import MailIconPath from '../../../../public/assets/svg/email.svg';
import PhoneIconpath from '../../../../public/assets/svg/call.svg';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import moment from 'moment';

const Wrapper = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
  height: 100%;

  border-left: 2px solid rgba(0, 0, 0, 0.1);

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 1rem;
  }
`;

const DaysContainer = styled.div``;
const Day = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 1.2rem;
`;
const DayName = styled.span<{
  selected: boolean;
}>`
  text-decoration: ${(p) => p.selected && 'underline'};
  font-weight: ${(p) => p.selected && 'bold'};
`;
const DayTime = styled.span`
  font-weight: 600;
`;

const Item = styled.div`
  margin: 2em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MainArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledLink = styled.a`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-weight: 500;
  color: ${(p) => p.theme.textDarkColor};
  font-size: 0.9rem;
  max-width: max-content;
  align-self: center;
`;

const MailIcon = styled(MailIconPath)`
  margin: 0 1rem 0 0.5rem;
`;
const ArrowIcon = styled(ArrowIconPath)`
  width: 24px;
  height: 24px;
`;
const Phoneicon = styled(PhoneIconpath)`
  margin: 0 1rem 0 0.5rem;
`;

const Map = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    iframe {
      height: 400px;
    }
  }
`;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const BasicContactUsInformation = () => {
  const [currentDay] = useState(capitalize(moment().format('dddd')));

  const { t } = useTranslation('contact-us');
  const timings = useAppSelector(selectTimings);
  const addressData = useAppSelector(selectAddress);
  const shopData = useAppSelector(selectShop);

  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map((day) => {
    if (timings === null) return;
    return {
      dayName: t(`@${day}`),
      time: (timings[day] as ITimingsDay).shop?.timings?.map((t) => `${t.open} - ${t.close}`).join(', ') || (
        <span style={{ color: 'red', fontWeight: 500 }}>Closed</span>
      ),
      available: (timings[day] as ITimingsDay).shop.availability,
    };
  });

  return (
    <Wrapper>
      <DaysContainer>
        {days.map((day) => (
          <Day key={day?.dayName}>
            <DayName selected={currentDay === day?.dayName}>{day?.dayName}</DayName> <DayTime>{day?.time}</DayTime>
          </Day>
        ))}

        {!!addressData?.email && (
          <Item>
            <MainArea>
              <MailIcon />

              <Text>{addressData.email}</Text>
            </MainArea>

            <LinkArea>
              <StyledLink href={`mailto:${addressData.email}`}>
                Email
                <ArrowIcon />
              </StyledLink>
            </LinkArea>
          </Item>
        )}

        {addressData?.country_code && addressData?.phone && (
          <Item>
            <MainArea>
              <Phoneicon />

              <Text>
                +{addressData.country_code}
                {addressData.phone}
              </Text>
            </MainArea>

            <LinkArea>
              <StyledLink href={`tel:+${addressData.country_code}${addressData.phone}`}>
                Phone
                <ArrowIcon />
              </StyledLink>
            </LinkArea>
          </Item>
        )}
      </DaysContainer>

      <Map>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY}&q=${shopData?.name.replace(
            ' ',
            '+',
          )},${addressData?.city.replace(' ', '+')}+${addressData?.country.replace(' ', '+')}`}
          title="Restaurant Map"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </Map>
    </Wrapper>
  );
};

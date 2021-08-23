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
import CustomLink from '../../common/amplitude/customLink';
import SvgDropDownIconPath from '../../../../public/assets/svg/angle-dropdown.svg';

const Wrapper = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
  height: 100%;
  width: max-content;

  border-left: 2px solid rgba(0, 0, 0, 0.1);

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 1rem;
  }
`;

const DaysContainer = styled.div`
  margin: 1rem 0;
  min-width: 350px;
`;
const Day = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 1rem;
  font-size: 1rem;
`;
const DayName = styled.span<{
  selected: boolean;
}>`
  text-decoration: ${(p) => p.selected && 'underline'};
  font-weight: ${(p) => p.selected && 'bold'};
  width: 50%;
`;
const DayTime = styled.span`
  font-weight: 600;
  font-size: clamp(1rem, 1.1rem, 2vw);
  width: 50%;
  text-align: right;
  font-size: 1rem;
`;

const Item = styled.div`
  /* margin: 2em 0; */
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
  margin: 1rem 0;
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
  font-size: 1rem;
`;

const Map = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-top: 2rem;
    iframe {
      width: 100%;
    }
  }
`;

const DropDownIcon = styled(SvgDropDownIconPath)<{ isOpened: boolean }>`
  margin: 0 1rem;

  transition: transform 0.25s;
  transform: ${(p) => (p.isOpened ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const DropDownContainer = styled.div`
  min-width: 350px;
`;

const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    background: #e4eef9;
  }
`;

const DropDownBody = styled.div<{ isOpened: boolean }>`
  transition: all 0.5s;

  max-height: 0px;
  opacity: 0;
  padding: 0;
  overflow: hidden;

  ${({ isOpened }) =>
    isOpened &&
    `
    opacity: 1;
    max-height: 500px;
    padding: 0 ;
  `}
`;

const Title = styled.h5`
  font-size: 18px;
  padding: 0 1rem;
  margin: 0;
`;

const Divider = styled.p`
  width: 100%;
  height: 1px;
  background: #e4eef9;
  padding: 0;
  margin: 0.2rem 0;
`;

export const BasicContactUsInformation = () => {
  const [currentDay] = useState(capitalize(moment().format('dddd')));

  const { t } = useTranslation('contact-us');
  const timings = useAppSelector(selectTimings);
  const addressData = useAppSelector(selectAddress);
  const shopData = useAppSelector(selectShop);

  const [isOpened, setIsOpened] = useState<string>('shop_time');

  const shopDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map((day) => {
    if (timings === null) return;

    const time = (timings[day] as ITimingsDay).shop?.timings;

    return {
      dayName: t(`@${day}`),
      time,
      availability: (timings[day] as ITimingsDay).shop.availability,
    };
  });

  const deliveryDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map((day) => {
    if (timings === null) return;

    const time = (timings[day] as ITimingsDay).delivery?.timings;

    return {
      dayName: t(`@${day}`),
      time,
      availability: (timings[day] as ITimingsDay).delivery.availability,
    };
  });

  console.log('deliver ', deliveryDays);

  const handleDropDownOpen = async (_e: any, tag: string) => {
    setIsOpened(isOpened === tag ? '' : tag);
  };

  return (
    <Wrapper>
      <DaysContainer>
        <DropDownContainer>
          <DropDownHeader onClick={async (e) => await handleDropDownOpen(e, 'shop_time')}>
            <DropDownIcon isOpened={isOpened === 'shop_time'} />
            <Title>Shop Timing</Title>
          </DropDownHeader>

          <DropDownBody isOpened={isOpened === 'shop_time'}>
            {shopDays.map((day) => (
              <>
                <Day key={day?.dayName}>
                  <DayName selected={currentDay === day?.dayName}>{day?.dayName}</DayName>
                  {day?.availability ? (
                    <DayTime>
                      {day?.time?.map((t) => (
                        <>
                          <span>
                            {t.open} - {t.close}
                          </span>
                          <br />
                        </>
                      ))}
                    </DayTime>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 500 }}>{t('@closed')}</span>
                  )}
                </Day>
                <Divider />
              </>
            ))}
          </DropDownBody>
        </DropDownContainer>

        <DropDownContainer>
          <DropDownHeader onClick={async (e) => await handleDropDownOpen(e, 'delivery_time')}>
            <DropDownIcon isOpened={isOpened === 'delivery_time'} />
            <Title>Delivery Timing</Title>
          </DropDownHeader>

          <DropDownBody isOpened={isOpened === 'delivery_time'}>
            {deliveryDays.map((day) => (
              <>
                <Day key={day?.dayName}>
                  <DayName selected={currentDay === day?.dayName}>{day?.dayName}</DayName>
                  {day?.availability ? (
                    <DayTime>
                      {day?.time?.map((t) => (
                        <>
                          <span>
                            {t.open} - {t.close}
                          </span>
                          <br />
                        </>
                      ))}
                    </DayTime>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 500 }}>{t('@closed')}</span>
                  )}
                </Day>
                <Divider />
              </>
            ))}
          </DropDownBody>
        </DropDownContainer>

        {!!addressData?.email && (
          <Item>
            <MainArea>
              <MailIcon />

              <Text>{addressData.email}</Text>
            </MainArea>

            <LinkArea>
              <CustomLink
                href={`mailto:${addressData.email}`}
                amplitude={{
                  type: 'link',
                  text: t('@phone'),
                }}
                Override={StyledLink}
              >
                Email
                <ArrowIcon />
              </CustomLink>
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
              <CustomLink
                href={`tel:+${addressData.country_code}${addressData.phone}`}
                amplitude={{
                  type: 'link',
                  text: t('@phone'),
                }}
                Override={StyledLink}
              >
                {t('@phone')}
                <ArrowIcon />
              </CustomLink>
            </LinkArea>
          </Item>
        )}
      </DaysContainer>

      <Map>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${
            process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY
          }&q=${shopData?.name.replace(' ', '+')},${addressData?.city.replace(' ', '+')}+${addressData?.country.replace(' ', '+')}`}
          title="Restaurant Map"
          height="400"
          width="400"
          frameBorder="0"
          style={{ border: 0 }}
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </Map>
    </Wrapper>
  );
};

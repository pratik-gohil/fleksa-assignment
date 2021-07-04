import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import { ITimingsDay } from '../../interfaces/common/shop.common.interfaces';
import { useAppSelector } from '../../redux/hooks.redux';
import { selectAddress, selectShop, selectTimings } from '../../redux/slices/index.slices.redux';

const Title = styled.h1`
  font-size: 28px;
`;

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.dimen.X4}px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.dimen.X4}px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const ContactUsPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation('contact-us');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const shopData = useAppSelector(selectShop);
  const timings = useAppSelector(selectTimings);
  const addressData = useAppSelector(selectAddress);

  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map((day) => {
    if (timings === null) return;
    return {
      dayName: t(`@${day}`),
      time: (timings[day] as ITimingsDay).shop?.timings?.map((t) => `${t.open} - ${t.close}`).join(', '),
      available: (timings[day] as ITimingsDay).shop.availability,
    };
  });

  return (
    <Container>
      <Row>
        <Col>
          <Title>{t('@title')}</Title>
          <Form>
            <Label>{t('@name')}</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Label>{t('@email')}</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label>{t('@subject')}</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            <Label>{t('@message')}</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </Form>
        </Col>

        <Col>
          {days.map((day) => (
            <p key={day?.dayName}>
              {day?.dayName} - {day?.time}
            </p>
          ))}
        </Col>

        <Col>
          {/* <iframe
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
          ></iframe> */}
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPageTemplateOne;

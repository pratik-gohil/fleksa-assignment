import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { BasicContactUsInformation } from '../../components/templateOne/pages/contact-us/basic-information.contact-us.pages.templateOne.components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const ContactUsContainer = styled.div``;

const Header = styled.div`
  padding-top: 2em;
  max-width: 700px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(p) => p.theme.textDarkColor};
  margin-bottom: 0.1em;
  text-align: left;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-align: center;
  }
`;
const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  color: ${(p) => p.theme.textDarkColor};
  text-align: left;
  margin-bottom: 2em;

  @media (max-width: 576px) {
    text-align: center;
  }
`;

const Form = styled.form`
  max-width: 700px;
  margin: auto;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 1rem 1rem 3rem 1rem;
  }
`;

const Label = styled.label`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 500;
  padding-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.dimen.X4}px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;

  display: inline-block;
  font-size: 1rem;
  padding: 1rem;
  outline: none;
  border-radius: 5px;
  font-weight: 300;
  color: ${(p) => p.theme.textDarkColor};
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.dimen.X4}px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;

  display: inline-block;
  font-size: 1rem;
  padding: 1rem;
  outline: none;
  border-radius: 5px;
  font-weight: 300;
  color: ${(p) => p.theme.textDarkColor};
  width: 100%;
`;

const BottomContainer = styled.div`
  display: flex;

  div {
    width: 50%;

    @media (max-width: ${BREAKPOINTS.sm}px) {
      width: 100%;
    }
  }
`;

const InputContainerFlex = styled.div`
  display: flex;
  column-gap: 1rem;

  div {
    width: 50%;

    @media (max-width: ${BREAKPOINTS.sm}px) {
      width: 100%;
      flex-wrap: wrap;
    }
  }
`;
const InputContainer = styled.div`
  div {
    width: 100%;
    padding-right: 0.5rem;
  }
`;
const InputBox = styled.div`
  padding: 0.5rem 0;
`;

const ContactUsImage = styled.img`
  max-height: 220px;
  margin: auto;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const AgreementBox = styled.div`
  display: flex;
  align-items: center;
`;
const Acknowledgement = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${(p) => p.theme.textDarkColor};
  width: max-content;
`;
const Checkbox = styled.input`
  margin-right: 0.5rem;
`;
const SendButton = styled.button`
  max-width: 120px !important;
  padding: 0.8em;
  font-size: 1em;
  font-weight: 600;
  color: white;
  background-color: ${(p) => p.theme.textDarkColor};
  width: 100%;
  max-width: 100px;
  margin: 0 auto;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.3);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    max-width: 300px;
    margin: 0;
  }
`;

const ContactUsPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation('contact-us');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Container
      fluid
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <ContactUsContainer>
        <Row nogutter>
          <Col xl={8}>
            <Header>
              <Title>{t('@title')}</Title>
              <SubTitle>{t('@sub_title')}</SubTitle>
            </Header>

            <Form>
              <InputContainerFlex>
                <InputBox>
                  <Label>{t('@name')}</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </InputBox>
                <InputBox>
                  <Label>{t('@email')}</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </InputBox>
              </InputContainerFlex>

              <BottomContainer>
                <InputContainer>
                  <InputBox>
                    <Label>{t('@subject')}</Label>
                    <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                  </InputBox>
                  <InputBox>
                    <Label>{t('@message')}</Label>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                  </InputBox>
                </InputContainer>
                <ContactUsImage src="/assets/svg/contact_us_main_img.svg" />
              </BottomContainer>

              <AgreementBox>
                <Checkbox type="checkbox" checked={false} />
                <Acknowledgement>
                  Yes, I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
                </Acknowledgement>
              </AgreementBox>

              <SendButton type="submit">Send</SendButton>
            </Form>
          </Col>

          <Col xl={4}>
            <BasicContactUsInformation />
          </Col>
        </Row>
      </ContactUsContainer>
    </Container>
  );
};

export default ContactUsPageTemplateOne;

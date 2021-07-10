import React, { FormEvent, FunctionComponent } from 'react';
import styled from 'styled-components';

import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.redux';
import { selectConfiguration } from '../../redux/slices/configuration.slices.redux';
import { selectShop } from '../../redux/slices/index.slices.redux';
import { Snackbar } from '../../components/templateOne/common/snackbar/snackbar.error.pages.templateOne.components';
import { updateError } from '../../redux/slices/common.slices.redux';
import { BasicContactUsInformation } from '../../components/templateOne/pages/contact-us/basic-information.contact-us.pages.templateOne.components';

import LoadingIndicator from '../../components/templateOne/common/loadingIndicator/loading-indicator.common.templateOne.components';
import NodeApiHttpPostContactUs from '../../http/nodeapi/contact-us/post.contact-us.nodeapi.http';

const ContactUsContainer = styled.div`
  width: 80%;
  margin: auto;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const Header = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(p) => p.theme.textDarkColor};
  text-align: left;
  margin: 0;
  padding: 0;
  padding-top: 2rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-align: center;
  }
`;
const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  color: ${(p) => p.theme.textDarkColor};
  text-align: left;
  padding: 0;
  margin: 0 0 2em 0;

  @media (max-width: 576px) {
    text-align: center;
  }
`;

const Form = styled.form`
  max-width: 700px;
  margin: auto;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 1rem 1rem 2rem 1rem;
    background-color: ${(p) => p.theme.primaryColor};
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
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: block;

    div {
      width: 100%;
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

  a {
    text-decoration: underline;
  }
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
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

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
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const configuration = useAppSelector(selectConfiguration);
  const shopData = useAppSelector(selectShop);
  const dispatch = useAppDispatch();

  const handleContactUsSendButtonClick = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!checked) {
        dispatch(
          updateError({
            show: true,
            message: 'Kindly accept our terms and service.',
            severity: 'error',
          }),
        );
        return;
      }

      setLoading(true);

      const response = await new NodeApiHttpPostContactUs(configuration).post({
        email,
        subject,
        message,
        name,
        shop_id: shopData?.id as unknown as number,
      });

      setLoading(false);

      if (!response.result) {
        dispatch(
          updateError({
            show: true,
            message: response.message,
            severity: 'error',
          }),
        );

        return;
      }

      // TODO: Reset inputs
      setEmail('');
      setName('');
      setMessage('');
      setSubject('');
      setChecked(false);

      dispatch(
        updateError({
          show: true,
          message: 'Successfully sent 👏 Thanks for contacting us.',
          severity: 'success',
        }),
      );
    } catch (e) {
      console.error(e);
      setLoading(false);
      dispatch(
        updateError({
          show: true,
          message: 'Ooops! Something went wrong.',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <>
      <ContactUsContainer>
        <Row nogutter>
          <Col xl={8}>
            <Form onSubmit={handleContactUsSendButtonClick}>
              <Header>
                <Title>{t('@title')}</Title>
                <SubTitle>{t('@sub_title')}</SubTitle>
              </Header>

              <InputContainerFlex>
                <InputBox>
                  <Label>{t('@name')}</Label>
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required={true} />
                </InputBox>
                <InputBox>
                  <Label>{t('@email')}</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                </InputBox>
              </InputContainerFlex>

              <BottomContainer>
                <InputContainer>
                  <InputBox>
                    <Label>{t('@subject')}</Label>
                    <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required={true} />
                  </InputBox>
                  <InputBox>
                    <Label>{t('@message')}</Label>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required={true} />
                  </InputBox>
                </InputContainer>
                <ContactUsImage src="/assets/svg/contact_us_main_img.svg" />
              </BottomContainer>

              <AgreementBox>
                <Checkbox type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                <Acknowledgement>
                  Yes, I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
                </Acknowledgement>
              </AgreementBox>

              <SendButton type="submit">{loading ? <LoadingIndicator width={20} /> : 'Send'}</SendButton>
            </Form>
          </Col>

          <Col xl={4}>
            <BasicContactUsInformation />
          </Col>
        </Row>
      </ContactUsContainer>

      <Snackbar />
    </>
  );
};

export default ContactUsPageTemplateOne;

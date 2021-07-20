import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const Wrapper = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding: 2rem 1rem 1rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: calc(${(p) => p.theme.navDesktop.height}px + 1rem);
  border-radius: 0.5rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    border: none;
    width: 100%;
    margin-top: 0;
    padding: 1rem 0 0 0;
  }
`;

const Heading1 = styled.h1`
  text-align: center;
  margin: 0;
  font-size: clamp(2rem, 2.5rem, 5vw);
`;

const Heading2 = styled.h2`
  font-size: clamp(1.5rem, 2rem, 5vw);
`;

const SubHeading = styled.h3`
  font-size: clamp(1rem, 1.5rem, 5vw);
`;

const Description = styled.p`
  text-align: justify;
  font-size: clamp(1rem, 1.1rem, 5vw);
`;

const PointsList = styled.ul`
  list-style: square;
  margin: 1rem 1rem;
`;

const PointsListOrder = styled.ol`
  list-style: none;
  margin: 1rem 1rem;
`;

const TableContainer = styled.div`
  border: 1px solid #000;
  margin: 1rem 0;
  padding: 0 1rem 1rem 1rem;
`;
const Table = styled.table`
  font-size: 1rem;
  width: 100%;

  tr {
    border-bottom: 1px solid #000;
  }
  td {
    font-size: 0.8rem;
    padding: 0 0.5rem;
    text-align: center;
  }
`;

const TermsPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-policy');

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <Heading1>{t('@title')}</Heading1>

            <Heading2>{t('@sub-title-1')}</Heading2>

            <Description>{t('@sub-title-1-paragraph-1')}</Description>
            <Description>{t('@sub-title-1-paragraph-2')}</Description>
            <Description>{t('@sub-title-1-paragraph-3')}</Description>

            <Heading2>{t('@sub-title-2')}</Heading2>
            <Description>{t('@sub-title-2-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-3')}</Heading2>
            <Description>{t('@sub-title-3-a')}</Description>
            <Description>{t('@sub-title-3-a-paragraph-1')}</Description>
            <PointsList>
              <li>
                <Description>{t('@sub-title-3-a-point-1')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-2')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-3')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-4')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-5')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-6')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-7')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-3-a-point-8')}</Description>
              </li>
            </PointsList>

            <SubHeading>{t('@sub-title-3-b')}</SubHeading>
            <Description>{t('@sub-title-3-b-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-3-c')}</SubHeading>
            <Description>{t('@sub-title-3-c-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-4')}</Heading2>

            <SubHeading>{t('@sub-title-4-a')}</SubHeading>
            <Description>{t('@sub-title-4-a-paragraph-1')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-2')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-3')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-4')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-5')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-6')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-7')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-8')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-9')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-10')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-11')}</Description>
            <Description>{t('@sub-title-4-a-paragraph-12')}</Description>

            <SubHeading>{t('@sub-title-4-b')}</SubHeading>
            <Description>{t('@sub-title-4-b-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-4-c')}</SubHeading>
            <Description>{t('@sub-title-4-c-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-5')}</Heading2>
            <SubHeading>{t('@sub-title-5-a')}</SubHeading>
            <Description>{t('@sub-title-5-a-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-5-b')}</SubHeading>
            <Description>{t('@sub-title-5-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-5-b-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-5-c')}</SubHeading>
            <Description>{t('@sub-title-5-c-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-6')}</Heading2>
            <Description>{t('@sub-title-6-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-6-a')}</SubHeading>
            <Description>{t('@sub-title-6-a-paragraph-1')}</Description>

            <PointsList>
              <li>
                <Description>{t('@sub-title-6-a-point-1')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-6-a-point-2')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-6-a-point-3')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-6-a-point-4')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-6-a-point-5')}</Description>
              </li>
            </PointsList>

            <SubHeading>{t('@sub-title-6-b')}</SubHeading>
            <Description>{t('@sub-title-6-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-6-b-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-6-c')}</SubHeading>
            <Description>{t('@sub-title-6-c-paragraph-1')}</Description>
            <Description>{t('@sub-title-6-c-paragraph-2')}</Description>

            <Heading2>{t('@sub-title-7')}</Heading2>
            <SubHeading>{t('@sub-title-7-a')}</SubHeading>
            <Description>{t('@sub-title-7-a-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-7-b')}</SubHeading>
            <Description>{t('@sub-title-7-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-7-b-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-7-c')}</SubHeading>
            <Description>{t('@sub-title-7-c-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-8')}</Heading2>
            <Description>{t('@sub-title-8-paragraph-1')}</Description>

            <PointsListOrder>
              <li>
                <Description>{t('@sub-title-8-point-a')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-8-point-b')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-8-point-c')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-8-point-d')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-8-point-e')}</Description>

                <PointsList>
                  <li>
                    <Description>{t('@sub-title-8-point-e-point-1')}</Description>
                  </li>

                  <li>
                    <Description>{t('@sub-title-8-point-e-point-2')}</Description>
                  </li>

                  <li>
                    <Description>{t('@sub-title-8-point-e-point-3')}</Description>
                  </li>
                </PointsList>
              </li>
            </PointsListOrder>

            <Description>{t('@sub-title-8-paragraph-2')}</Description>

            <Heading2>{t('@sub-title-9')}</Heading2>
            <SubHeading>{t('@sub-title-9-a')}</SubHeading>
            <Description>{t('@sub-title-9-a-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-9-b')}</SubHeading>
            <Description>{t('@sub-title-9-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-9-b-paragraph-2')}</Description>
            <Description>{t('@sub-title-9-b-paragraph-3')}</Description>

            <SubHeading>{t('@sub-title-9-c')}</SubHeading>
            <Description>{t('@sub-title-9-c-paragraph-1')}</Description>
            <Description>{t('@sub-title-9-c-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-9-d')}</SubHeading>
            <Description>{t('@sub-title-9-d-paragraph-1')}</Description>
            <Description>{t('@sub-title-9-d-paragraph-2')}</Description>
            <Description>{t('@sub-title-9-d-paragraph-3')}</Description>

            <Heading2>{t('@sub-title-10')}</Heading2>
            <SubHeading>{t('@sub-title-10-a')}</SubHeading>
            <Description>{t('@sub-title-10-a-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-10-b')}</SubHeading>
            <Description>{t('@sub-title-10-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-10-b-paragraph-2')}</Description>
            <Description>{t('@sub-title-10-b-paragraph-3')}</Description>

            <SubHeading>{t('@sub-title-10-c')}</SubHeading>
            <Description>{t('@sub-title-10-c-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-11')}</Heading2>
            <SubHeading>{t('@sub-title-11-a')}</SubHeading>
            <Description>{t('@sub-title-11-a-paragraph-1')}</Description>
            <Description>{t('@sub-title-11-a-paragraph-2')}</Description>

            <PointsList>
              <li>
                <Description>{t('@sub-title-11-a-point-1')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-2')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-3')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-4')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-4')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-5')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-6')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-7')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-8')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-9')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-10')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-11')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-12')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-13')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-14')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-15')}</Description>
              </li>
              <li>
                <Description>{t('@sub-title-11-a-point-16')}</Description>
              </li>
            </PointsList>

            <SubHeading>{t('@sub-title-11-b')}</SubHeading>
            <Description>{t('@sub-title-11-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-11-b-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-11-c')}</SubHeading>
            <Description>{t('@sub-title-11-c-paragraph-1')}</Description>
            <Description>{t('@sub-title-11-c-paragraph-2')}</Description>

            <Heading2>{t('@sub-title-12')}</Heading2>
            <Description>{t('@sub-title-12-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-12-a')}</SubHeading>
            <Description>{t('@sub-title-12-a-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-12-b')}</SubHeading>
            <Description>{t('@sub-title-12-b-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-12-c')}</SubHeading>
            <Description>{t('@sub-title-12-c-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-13')}</SubHeading>
            <SubHeading>{t('@sub-title-13-a')}</SubHeading>
            <Description>{t('@sub-title-13-a-paragraph-1')}</Description>
            <Description>{t('@sub-title-13-a-paragraph-2')}</Description>
            <Description>{t('@sub-title-13-a-paragraph-3')}</Description>
            <Description>{t('@sub-title-13-a-paragraph-4')}</Description>
            <Description>{t('@sub-title-13-a-paragraph-5')}</Description>

            <SubHeading>{t('@sub-title-13-b')}</SubHeading>
            <Description>{t('@sub-title-13-b-paragraph-1')}</Description>
            <Description>{t('@sub-title-13-b-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-13-c')}</SubHeading>
            <Description>{t('@sub-title-13-c-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-14')}</Heading2>
            <Description>{t('@sub-title-14-paragraph-1')}</Description>
            <Description>{t('@sub-title-14-paragraph-2')}</Description>

            <TableContainer>
              <SubHeading>Category:Statistics (3)</SubHeading>

              <Description>
                Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information
                anonymously.
              </Description>

              <Table>
                <tr>
                  <th>COOKIE NAME</th>
                  <th>PROVIDER</th>
                  <th>TYPE</th>
                  <th>EXPIRY</th>
                  <th>DESCRIPTION</th>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>fleksa.de</td>
                  <td>HTTP</td>
                  <td>2 years</td>
                  <td style={{ width: '55%' }}>
                    Registers a unique ID th at is used to generate statistical data on how the visitor uses the website.
                  </td>
                </tr>
                <tr>
                  <td>_gat</td>
                  <td>fleksa.de</td>
                  <td>HTTP</td>
                  <td>1 day</td>
                  <td style={{ width: '55%' }}>Used by Google Analytics to throttle request rate.</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>fleksa.de</td>
                  <td>HTTP</td>
                  <td>1 day</td>
                  <td style={{ width: '55%' }}>
                    Registers a unique ID that isused to generate statistical data on how the visitor uses the website.
                  </td>
                </tr>
              </Table>
            </TableContainer>

            <TableContainer>
              <SubHeading>Category:Marketing (2)</SubHeading>

              <Description>
                Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the
                individual user and thereby more valuable for publishers and third party advertisers. anonymously.
              </Description>

              <Table>
                <tr>
                  <th>COOKIE NAME</th>
                  <th>PROVIDER</th>
                  <th>TYPE</th>
                  <th>EXPIRY</th>
                  <th>DESCRIPTION</th>
                </tr>
                <tr>
                  <td>__ptq.gif </td>
                  <td>hubspot.com</td>
                  <td>Pixel</td>
                  <td>Session</td>
                  <td style={{ width: '55%' }}>
                    Sends data to the marketing platform Hubspot about the visitor's device and behaviour. Tracks the visitor across devices and
                    marketing channels.
                  </td>
                </tr>
                <tr>
                  <td>ads/ga-audiences</td>
                  <td>google.com</td>
                  <td>Pixel</td>
                  <td>Session</td>
                  <td style={{ width: '55%' }}>
                    Used by Google AdWords to re-engage visitors that are likely to convert to customers based on the visitor's online behaviour
                    across websites.
                  </td>
                </tr>
              </Table>
            </TableContainer>

            <Heading2>{t('@sub-title-15')}</Heading2>
            <Description>{t('@sub-title-15-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-16')}</Heading2>
            <Description>{t('@sub-title-16-paragraph-1')}</Description>

            <Heading2>{t('@sub-title-17')}</Heading2>
            <Description>{t('@sub-title-17-paragraph-1')}</Description>
            <Description>{t('@sub-title-17-paragraph-2')}</Description>
            <Description>{t('@sub-title-17-paragraph-3')}</Description>

            <SubHeading>{t('@sub-title-17-a')}</SubHeading>
            <Description>{t('@sub-title-17-a-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-17-b')}</SubHeading>
            <Description>{t('@sub-title-17-b-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-17-c')}</SubHeading>
            <Description>{t('@sub-title-17-c-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-17-d')}</SubHeading>
            <Description>{t('@sub-title-17-d-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-17-e')}</SubHeading>
            <Description>{t('@sub-title-17-e-paragraph-1')}</Description>

            <SubHeading>{t('@sub-title-17-f')}</SubHeading>
            <Description>{t('@sub-title-17-f-paragraph-1')}</Description>
            <Description>{t('@sub-title-17-f-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-17-g')}</SubHeading>
            <Description>{t('@sub-title-17-g-paragraph-1')}</Description>
            <Description>{t('@sub-title-17-g-paragraph-2')}</Description>

            <SubHeading>{t('@sub-title-17-h')}</SubHeading>
            <Description>{t('@sub-title-17-h-paragraph-1')}</Description>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default TermsPageTemplateOne;

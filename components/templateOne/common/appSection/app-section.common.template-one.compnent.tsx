import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import AppButtons from '../appButtons/app-buttons.common.templateOne.components';

const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10vh;
  padding-bottom: 10vh;
  & > div {
    flex: 1;
    padding: 0 100px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    background-image: url('/assets/svg/app-section-background.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
  @media (max-width: ${BREAKPOINTS.lg}px) {
    flex-direction: column-reverse;
    & > div {
      padding: 0 1rem;
      margin: 1rem 0;
      width: 100%;
    }
    & > div:nth-child(1) {
      background-image: url('/assets/svg/app-section-background.svg');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #ffd100;
`;

const Summary = styled.p`
  line-height: 2rem;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: ${BREAKPOINTS.lg}px) {
    align-items: center;
  }
`;

const Image = styled.img`
  height: 100%;
  @media (max-width: ${BREAKPOINTS.lg}px) {
    width: 70%;
    height: 50%;
  }
`;

const AppSection: FunctionComponent = () => {
  return (
    <WrapperContainer>
      <ImageSection>
        <Image src="assets/png/mobile-frame.png" />
      </ImageSection>
      <div>
        <Title>Jetzt die App herunterladen.</Title>
        <Summary>
          Laden Sie unsere App herunter. Wir wollen es Menschen wie Ihnen einfach und bequem machen. Sie können bequem von zu Hause aus
          bestellen! Worauf warten Sie also noch? Es ist an der Zeit, dass wir uns jetzt treffen, also laden Sie unsere App sofort herunter,
          indem Sie im iTunes oder Google Play Store suchen.
        </Summary>
        <AppButtons direction="row" />
      </div>
    </WrapperContainer>
  );
};

export default AppSection;

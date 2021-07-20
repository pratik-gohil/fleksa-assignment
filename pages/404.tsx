import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../constants/global-style.constants';
import { BREAKPOINTS } from '../constants/grid-system-configuration';
import { THEME_ONE } from '../constants/theme.constants';

const Container = styled.div`
  width: calc(100vw);
  height: calc(100vh);
  background: ${(p) => p.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0.5rem;
  }
`;

const Big = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  font-weight: 900;
  font-size: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.textDarkColor};
  opacity: 0.05;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 8rem;
    margin-top: -0.5em;
  }
`;
const TextContainer = styled.div`
  font-family: inherit;
  padding-top: 5em;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;
const Heading = styled.h1`
  color: ${(p) => p.theme.textDarkColor};
  width: 80%;
  text-align: center;
  font-weight: 700;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
    font-size: 1.3rem;
    /* margin-top: -2em; */
  }
`;
const SubHeading = styled.h2`
  font-weight: 400;
  color: ${(p) => p.theme.textDarkColor};
  margin-top: 0.5em;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
  }
`;
const Text = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 700;
  width: 12em;
  border: none;
  outline: none;
  height: 2em;
  margin-top: 3em;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1.5rem;
    width: 10em;
  }
`;

function Index() {
  const router = useRouter();

  return (
    <ThemeProvider theme={THEME_ONE}>
      <Container>
        <GlobalStyle />
        <InnerContainer>
          <Big>404</Big>
          <TextContainer>
            <Text>
              <Heading>Seems like we were not ready for that click.</Heading>
              <SubHeading>Let us show you the right path!</SubHeading>
            </Text>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </TextContainer>
        </InnerContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Index;

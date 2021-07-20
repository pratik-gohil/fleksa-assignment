import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(p) => p.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  margin-top: 2em;
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
  color: #202020;
  opacity: 0.05;
  @media screen and (max-width: 600px) {
    font-size: 12rem;
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
  @media screen and (max-width: 600px) {
    width: 120%;
    font-size: 1.5rem;
    margin-top: -2em;
  }
`;
const SubHeading = styled.h2`
  font-weight: 400;
  color: ${(p) => p.theme.textDarkColor};
  margin-top: 0.5em;
  text-align: center;
  @media screen and (max-width: 600px) {
    width: 120%;
    font-size: 1.5rem;
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
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    width: 10em;
  }
`;

function Index() {
  const router = useRouter();

  return (
    <Container>
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
  );
}

export default Index;

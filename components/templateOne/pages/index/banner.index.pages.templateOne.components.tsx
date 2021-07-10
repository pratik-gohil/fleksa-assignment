import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectBanner } from '../../../../redux/slices/index.slices.redux';

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(p) => (p.visible ? 'grid' : 'none')};
  place-items: center;
`;

const Container = styled.div`
  width: 80%;
  max-width: 350px;
  background-color: white;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  text-align: center;
  border-radius: 20px;
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  margin-bottom: 0.5em;
  object-fit: cover;
  border-radius: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${(p) => p.theme.textDarkColor};
  margin-bottom: 0.5em;
`;

const Description = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(p) => p.theme.textDarkColor};
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1em;
`;

const Cross = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }

  display: grid;
  place-items: center;
`;

const Temp = styled.div<{ visible: boolean }>`
  width: 100vmax;
  height: 100vmin;
  position: absolute;
  z-index: -1;
  display: ${(p) => (p.visible ? 'unset' : 'none')};
`;

const IndexBanner = () => {
  const banner = useAppSelector(selectBanner);
  const [showOfferPopup, setOfferPopup] = useState(true);

  const handleOfferClose = async () => {
    setOfferPopup(false);
    window.localStorage.setItem('offer_closed', '0');
  };

  useEffect(() => {
    if (window.localStorage.getItem('offer_closed') === '0') setOfferPopup(false);
    else setOfferPopup(true);

    window.onbeforeunload = () => window.localStorage.setItem('offer_closed', '1');
  }, []);

  return banner ? (
    <Wrapper visible={showOfferPopup}>
      <Container>
        <Img src={banner.background} alt="garlic kulcha" />
        <Title>{banner.title}</Title>
        <Description>{banner.description}</Description>
        <Cross onClick={handleOfferClose}>X</Cross>
        <Temp onClick={handleOfferClose} visible={showOfferPopup} />
      </Container>
    </Wrapper>
  ) : null;
};

export default IndexBanner;

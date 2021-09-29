import { FunctionComponent } from 'react';
import styled from 'styled-components';
import CustomLink from '../amplitude/customLink';

interface IPropsAppButton {
  direction: string;
}

interface IPropsWrapperContainer {
  direction: string;
}

const AppButton = styled.div`
  flex: 1;
  display: inline-flex;
  background: #202020;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 0.6rem;
  padding: 8px;
  line-height: 1rem;
`;

const WrapperContainer = styled.div<IPropsWrapperContainer>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  min-width: fit-content;
  max-width: 360px;
  margin-top: 1rem;
  ${AppButton}:nth-child(1) {
    margin-right: 10px;
  }
`;

const Icon = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
`;

const Title = styled.span`
  font-size: 12px;
  display: block;
`;

const StoreName = styled.span`
  font-weight: 700;
  display: block;
`;

const AppButtons: FunctionComponent<IPropsAppButton> = ({ direction }) => {
  return (
    <WrapperContainer direction={direction}>
      <CustomLink amplitude={{ type: 'button', text: '' }} target="_blank" externelHref="/">
        <AppButton>
          <Icon src="/assets/svg/app/google-playstore.svg" />
          <div>
            <Title>GET IT ON</Title>
            <StoreName>Google Play</StoreName>
          </div>
        </AppButton>
      </CustomLink>
      <CustomLink amplitude={{ type: 'button', text: '' }} target="_blank" externelHref="/">
        <AppButton>
          <Icon src="/assets/svg/app/apple-appstore.svg" />
          <div>
            <Title>Download on the</Title>
            <StoreName>Apple Store</StoreName>
          </div>
        </AppButton>
      </CustomLink>
    </WrapperContainer>
  );
};

export default AppButtons;

import { FunctionComponent } from 'react';
import styled from 'styled-components';
import CustomLink from '../amplitude/customLink';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectAppLinks } from '../../../../redux/slices/common.slices.redux';
import { useAppSelector } from '../../../../redux/hooks.redux';

interface IPropsAppButtonComponent {
  direction: string;
  theme?: string;
}

interface IPropsWrapperContainer {
  direction: string;
}

interface IPropsAppButtonElement {
  theme_color?: string;
}

const AppButton = styled.div<IPropsAppButtonElement>`
  flex: 1;
  display: inline-flex;
  background: ${(props) => (props.theme_color === 'light' ? '#fff' : '#202020')};
  color: ${(props) => (props.theme_color === 'light' ? '#202020' : '#fff')};
  border: ${(props) => (props.theme_color === 'light' ? '2px solid #202020' : '2px solid #fff')};
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
  & > a:nth-child(2) {
    margin-left: 10px;
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
  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const StoreName = styled.span`
  font-weight: 700;
  display: block;
  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-align: right;
  }
`;

const AppButtons: FunctionComponent<IPropsAppButtonComponent> = ({ direction, theme }) => {
  const appLinks = useAppSelector(selectAppLinks);

  return (
    <WrapperContainer direction={direction}>
      <CustomLink amplitude={{ type: 'button', text: 'android' }} target="_blank" externalHref={appLinks.android}>
        <AppButton theme_color={theme}>
          <Icon src="/assets/svg/app/google-playstore.svg" />
          <div>
            <Title>GET IT ON</Title>
            <StoreName>Google Play</StoreName>
          </div>
        </AppButton>
      </CustomLink>
      <CustomLink amplitude={{ type: 'button', text: 'ios' }} target="_blank" externalHref={appLinks.ios}>
        <AppButton theme_color={theme}>
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

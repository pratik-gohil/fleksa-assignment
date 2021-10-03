import { FunctionComponent } from 'react';
import styled from 'styled-components';
import CustomLink from '../amplitude/customLink';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectAppLinks } from '../../../../redux/slices/common.slices.redux';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { useTranslation } from 'react-i18next';

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
  padding: 0.5rem 0.3rem;
  line-height: 1rem;
`;

const WrapperContainer = styled.div<IPropsWrapperContainer>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  min-width: fit-content;
  margin-top: 1rem;

  & > a:nth-child(2) {
    margin-left: 10px;
  }
`;

const Icon = styled.img`
  margin-right: 0.2rem;
  width: 30px;
  height: 30px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.span`
  font-size: 12px;
  display: block;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 10px;
  }
`;

const StoreName = styled.span`
  font-weight: 700;
  display: block;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 14px;
  }
`;

const AppButtons: FunctionComponent<IPropsAppButtonComponent> = ({ direction, theme }) => {
  const appLinks = useAppSelector(selectAppLinks);
  const { t } = useTranslation('app-buttons');

  return appLinks ? (
    <WrapperContainer direction={direction}>
      <CustomLink amplitude={{ type: 'button', text: 'android' }} target="_blank" externalHref={appLinks.android}>
        <AppButton theme_color={theme}>
          <Icon src={theme == 'light' ? '/assets/svg/app/google-playstore-dark.svg' : '/assets/svg/app/google-playstore.svg'} />

          <div>
            <Title>{t('@android-title')}</Title>
            <StoreName>Google Play</StoreName>
          </div>
        </AppButton>
      </CustomLink>

      <CustomLink amplitude={{ type: 'button', text: 'ios' }} target="_blank" externalHref={appLinks.ios}>
        <AppButton theme_color={theme}>
          <Icon src={theme == 'light' ? '/assets/svg/app/apple-appstore-dark.svg' : '/assets/svg/app/apple-appstore.svg'} />
          <div>
            <Title>{t('@ios-title')}</Title>
            <StoreName>Apple Store</StoreName>
          </div>
        </AppButton>
      </CustomLink>
    </WrapperContainer>
  ) : (
    <></>
  );
};

export default AppButtons;

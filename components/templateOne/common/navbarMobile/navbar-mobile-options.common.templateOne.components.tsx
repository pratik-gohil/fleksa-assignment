import { useTranslation } from 'next-i18next';
import { Fragment, FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectOffers, selectShop } from '../../../../redux/slices/index.slices.redux';
import NavLanguageChange from '../navbarDesktop/nav-language-change.templateOne.components';

import SvgRestaurant from '../../../../public/assets/svg/restaurant.svg';
import SvgReservation from '../../../../public/assets/svg/reservation.svg';
import SvgGallery from '../../../../public/assets/svg/gallery.svg';
import SvgContact from '../../../../public/assets/svg/contact.svg';
import LegalLinks from '../footer/legal.footer.common.templateOne.components';
import NavUserProfile from '../navbarDesktop/nav-profile-image.templateOne.components';
import { selectCustomer, selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';

export interface IPropsNavbarMobileOptions {
  isOpen: boolean;
}

const Wrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: ${(props) => props.theme.navMobile.height}px;
  right: ${(props) => (props.isOpen ? 0 : '-100%')};
  width: 100%;
  transition-duration: 300ms;
  color: #fff;
`;

const List = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background-color: rgba(0, 0, 0, 0.8);
  max-width: 100%;
  transition-duration: 300ms;
  box-shadow: 0 -10px 100px 0 rgba(0, 0, 0, 0.5);
  overflow: auto;
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  svg {
    height: 36px;
    width: 36px;
    fill: #fff;
    margin: 0 ${(props) => props.theme.dimen.X4}px;
  }
`;

const LinkItem = styled.a`
  display: flex;
  flex: 1;
  align-items: center;
  padding: ${(props) => props.theme.dimen.X4}px;
`;

const LegalLinksContainer = styled(ListItem)`
  margin-top: auto;
  a {
    color: #fff;
  }
  border-bottom: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 ${(props) => props.theme.dimen.X4}px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`;

const NavbarMobileOptions: FunctionComponent<IPropsNavbarMobileOptions> = ({ isOpen }) => {
  const shopData = useAppSelector(selectShop);
  const customerData = useAppSelector(selectCustomer);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const offersData = useAppSelector(selectOffers);

  const { t } = useTranslation('header');

  return (
    <Wrapper isOpen={isOpen}>
      <List isOpen={isOpen}>
        {[
          {
            title: shopData?.name,
            icon: SvgRestaurant,
            link: '/',
            show: true,
          },
          {
            title: t('@reservation'),
            icon: SvgReservation,
            link: '/reservation',
            show: true,
          },
          {
            title: t('@gallery'),
            icon: SvgGallery,
            link: '/gallery',
            show: true,
          },
          {
            title: t('@offers'),
            icon: SvgGallery,
            link: '/offers',
            show: offersData.length > 0,
          },
          {
            title: t('@contact'),
            icon: SvgContact,
            link: '/contact-us',
            show: true,
          },
        ].map((item) =>
          item.show ? (
            <ListItem key={item.title}>
              <LinkItem href={item.link}>
                <item.icon />
                <Title>{item.title}</Title>
              </LinkItem>
            </ListItem>
          ) : (
            <Fragment key={item.title} />
          ),
        )}
        <ListItem key="lang-change">
          <NavLanguageChange showTitle={true} style={{ padding: '12px 24px' }} />
        </ListItem>

        {isLoggedIn ? (
          <ListItem key="account">
            <NavUserProfile />
            <LinkItem href="/account">
              <Title>{customerData.name}</Title>
            </LinkItem>
          </ListItem>
        ) : (
          <ListItem key="login">
            <LinkItem href={'/login'}>
              <SvgContact style={{ fill: 'transparent' }} />
              <Title>{t('@login')}</Title>
            </LinkItem>
          </ListItem>
        )}

        <LegalLinksContainer key="legal-links">
          <LegalLinks />
        </LegalLinksContainer>
      </List>
    </Wrapper>
  );
};

export default NavbarMobileOptions;

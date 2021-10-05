import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import CustomLink from '../amplitude/customLink';

export interface IPropsNavLanguageChange {
  showTitle?: boolean;
  style?: CSSProperties;
}

const SvgFlagGerman = '/assets/svg/flag-german.svg';
const SvgFlagUnitedKingdom = '/assets/svg/flag-united-kingdom.svg';

const FlagContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0 ${(props) => props.theme.dimen.X4}px;
`;

const FlagImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 40px;
  border: 1px solid #efefef;
  cursor: pointer;
  display: block;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 400;
  padding: 0%;
  margin: 0 0 0 ${(props) => props.theme.dimen.X4}px;
`;

const NavLanguageChange: FunctionComponent<IPropsNavLanguageChange> = ({ showTitle = false, style }) => {
  const language = useAppSelector(selectLanguage);
  const router = useRouter();

  /**
   * @returns {string} corresponding link needs to switch
   */
  const getCorrespondLink = () => {
    if (router.pathname === '/menu/[id]')
      // ?? Only switch for menu by id on mobile view
      return `/menu/${router.query.id}`;

    return router.pathname;
  };

  return (
    <CustomLink
      href={getCorrespondLink()}
      isLanguageChange={true}
      amplitude={{
        text: 'language icon',
        type: 'image',
      }}
    >
      <FlagContainer style={style}>
        <FlagImage src={router.locale === 'en' ? SvgFlagUnitedKingdom : SvgFlagGerman} />
        {showTitle && <Title>{language === 'english' ? 'ENGLISH' : 'DEUTSCH'}</Title>}
      </FlagContainer>
    </CustomLink>
  );
};

export default NavLanguageChange;

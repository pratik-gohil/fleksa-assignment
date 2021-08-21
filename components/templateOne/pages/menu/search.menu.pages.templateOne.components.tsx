import { FunctionComponent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks.redux';
import { selectSearchQuery, updateSearchQuery } from '../../../../redux/slices/menu.slices.redux';
import SvgSearch from '../../../../public/assets/svg/search.svg';
import { useState } from 'react';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useTranslation } from 'next-i18next';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

const SearchContainer = styled.div<{ searchOpen: boolean }>`
  display: flex;
  flex: 1 0 0px;
  flex-direction: row;
  align-items: center;
  width: ${(props) => (props.searchOpen ? '200px' : `${props.theme.dimen.X4 * 2 + 20}px`)};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  margin: ${(props) => props.theme.dimen.X4 * 2}px 0;
  padding-left: ${(props) => props.theme.dimen.X4}px;
  overflow: hidden;
  &:focus-within {
    border-color: #000;
  }
  svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${(props) => props.theme.dimen.X4}px;
  margin: 0;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius}px;
  outline: none;
`;

const MenuSearch: FunctionComponent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchQuery = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('page-menu-id');

  const node = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (node.current?.contains(e.target)) {
      setSearchOpen(true);
      return;
    }
    setSearchOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <SearchContainer ref={node} searchOpen={searchOpen}>
      <SvgSearch />
      <SearchInput
        placeholder={t('@search')}
        value={searchQuery}
        onChange={(ev) => dispatch(updateSearchQuery(ev.target.value.toLowerCase()))}
        onBlur={() =>
          amplitudeEvent(constructEventName(`category-sidebar-${t('@search')}`, 'input'), {
            searchQuery,
            length: searchQuery.length,
          })
        }
      />
    </SearchContainer>
  );
};

export default MenuSearch;

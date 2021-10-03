import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import { selectCategoryNames } from '../../../../redux/slices/menu.slices.redux';
import CustomLink from '../../common/amplitude/customLink';
import MenuSearch from './search.menu.pages.templateOne.components';

const List = styled.ul`
  display: flex;
  overflow: auto;
  padding-left: 15px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    padding-left: 0;
    flex-direction: column;
    padding-bottom: 1.5rem;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    justify-content: flex-end;
  }
`;

const CategoryButton = styled.a`
  display: block;
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin: ${(props) => props.theme.dimen.X2}px;
`;

const CategoryButtonText = styled.h2<{ active: boolean }>`
  display: block;
  font-size: 16px;
  margin: 0;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${(props) => props.theme.primaryColor};
    transition: width 0.3s;
  }
  ${(props) =>
    props.active &&
    css`
      &::after {
        width: 100%;
      }
    `}
  @media (min-width: ${BREAKPOINTS.lg}px) {
    text-align: right;
    &:hover::after {
      width: 100%;
    }
  }
`;

const MenuPageCategorySidebar: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const categories = useAppSelector(selectCategoryNames);

  const [idList] = useState(
    categories.map(
      (i) =>
        '#' +
        i.name_json.english
          .toLowerCase()
          .replace(/[^A-Za-z0-9]/g, '')
          .split(' ')
          .join('-'),
    ),
  );

  const [activeId, setActiveId] = useState(idList[0]);

  const scrollIntoView = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

  function navHighlighter(sections: NodeListOf<Element>) {
    let lastVisible: string | undefined = undefined;
    for (const current in sections) {
      let el = sections[current] as any;
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      const visible =
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset;

      if (!sections[current].getAttribute) break;

      lastVisible = sections[current].getAttribute('id') as string;

      if (visible) break;
    }

    if (lastVisible && lastVisible !== activeId) setActiveId(lastVisible);
  }

  useEffect(() => {
    let sections: NodeListOf<Element>;
    if (window !== 'undefined' && idList.length > 0) {
      sections = document.querySelectorAll(idList.join(','));
      window.addEventListener('scroll', navHighlighter.bind(null, sections));
    }
    return () => window.removeEventListener('scroll', navHighlighter.bind(null, sections));
  }, []);

  function scrollParentToChild(parent: HTMLElement, child: HTMLElement) {
    var parentRect = parent.getBoundingClientRect();
    var parentViewableArea = {
      height: parent.clientHeight,
      width: parent.clientWidth,
    };
    var childRect = child.getBoundingClientRect();
    var isViewable = childRect.left >= parentRect.left && childRect.left <= parentRect.left + parentViewableArea.width;
    if (!isViewable) {
      parent.scrollTo({
        top: 0,
        left: childRect.left + parent.scrollLeft - parentRect.left,
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    const parent = document.getElementById('list-list');
    const el = document.getElementById(`sidebar-${activeId}`);
    if (parent && el) scrollParentToChild(parent, el);
  }, [activeId]);

  return (
    <List id={'list-list'}>
      <ListItem key="search">
        <MenuSearch />
      </ListItem>

      {categories.map((category, index) => {
        const id = category.name_json.english
          .toLowerCase()
          .replace(/[^A-Za-z0-9]/g, '')
          .split(' ')
          .join('-');
        const sidebarId = `sidebar-${id}`;
        return (
          <ListItem key={index} id={sidebarId}>
            <CustomLink
              amplitude={{
                type: 'button',
                text: category.name_json[language],
                eventProperties: { to: { ...category.name_json }, from: activeId },
              }}
              callback={scrollIntoView.bind(null, id)}
              Override={CategoryButton}
            >
              <CategoryButtonText active={activeId === id}>{category.name_json[language]}</CategoryButtonText>
            </CustomLink>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MenuPageCategorySidebar;

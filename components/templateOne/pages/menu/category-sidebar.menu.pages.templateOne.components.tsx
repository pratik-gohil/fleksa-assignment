import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategoryNames } from "../../../../redux/slices/menu.slices.redux";
import MenuSearch from "./search.menu.pages.templateOne.components";

const List = styled.ul`
  display: flex;
  overflow: auto;
  padding-left: 15px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    padding-left: 0;
    flex-direction: column;
  }
`

const ListItem = styled.li`
  display: flex;
  flex-shrink: 0;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    justify-content: flex-end;
  }
`

const CategoryButton = styled.button`
  display: block;
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin: ${props => props.theme.dimen.X2}px;
`

const CategoryButtonText = styled.h2<{ active: boolean }>`
  display: block;
  font-size: 16px;
  margin: 0;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${props => props.theme.primaryColor};
    transition: width .3s;
  }
  ${props => props.active && css`
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
`

const MenuPageCategorySidebar: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const categories = useAppSelector(selectCategoryNames)

  const idList = categories.map(i => "#" + i.name_json.english.toLowerCase().replace(/[^A-Za-z0-9]/g,"").split(" ").join("-"))

  const [ activeId, setActiveId ] = useState(idList[0])

  const scrollIntoView = (id: string) => document.getElementById(id)?.scrollIntoView({
    block: "start",
    behavior: "smooth"
  })

  function navHighlighter(sections: NodeListOf<Element>) {
    for(const current in sections) {
      let el = sections[current] as any
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      const visible = (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
      );
      if (!sections[current].getAttribute) break
      setActiveId(sections[current].getAttribute("id") as string)
      if (visible) break
    }
  }

  useEffect(() => {
    let sections: NodeListOf<Element>;
    if (window !== "undefined") {
      sections = document.querySelectorAll(idList.join(","))
      window.addEventListener("scroll", navHighlighter.bind(null, sections));
      
    }
    return () => window.removeEventListener("scroll", navHighlighter.bind(null, sections));
  }, [ ])

  return <List>
    <ListItem key="search">
      <MenuSearch />
    </ListItem>
    {categories.map((category, index) => {
      const id = category.name_json.english.toLowerCase().replace(/[^A-Za-z0-9]/g,"").split(" ").join("-")
      return <ListItem key={index}>
        <CategoryButton onClick={scrollIntoView.bind(null, id)}>
          <CategoryButtonText active={activeId === id}>{category.name_json[language]}</CategoryButtonText>
        </CategoryButton>
      </ListItem>
    })}
  </List>

}

export default MenuPageCategorySidebar
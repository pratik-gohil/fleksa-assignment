import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategoryNames } from "../../../../redux/slices/menu.slices.redux";
import MenuSearch from "./search.menu.pages.templateOne.components";

const List = styled.ul`
  display: flex;
  overflow: auto;
  @media (min-width: ${BREAKPOINTS.lg}px) {
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

const CategoryButtonText = styled.h2`
  display: block;
  font-size: 16px;
  margin: 0;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    text-align: right;
      &::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background: ${props => props.theme.primaryColor};
      transition: width .3s;
    }
    &:hover::after {
      width: 100%;
    }
  }
`

const MenuPageCategorySidebar: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const categories = useAppSelector(selectCategoryNames)

  const scrollIntoView = (categoryEnglishName: string) => document.getElementById(categoryEnglishName.toLowerCase().split(" ").join("-"))?.scrollIntoView({
    block: "start",
    behavior: "smooth"
  })

  return <List>
    <ListItem key="search">
      <MenuSearch />
    </ListItem>
    {categories.map((category, index) => {
      return <ListItem key={index}>
        <CategoryButton onClick={scrollIntoView.bind(null, category.name_json.english)}>
          <CategoryButtonText>{category.name_json[language]}</CategoryButtonText>
        </CategoryButton>
      </ListItem>
    })}
  </List>

}

export default MenuPageCategorySidebar
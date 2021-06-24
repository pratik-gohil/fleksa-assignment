import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import { ICategory } from "../../../../interfaces/common/category.common.interfaces";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategories } from "../../../../redux/slices/menu.slices.redux";

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
  }
`

const MenuPageCategorySidebar: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const categories = useAppSelector(selectCategories)

  const scrollIntoView = (category: ICategory) => document.getElementById(category.name_json.english.toLowerCase().split(" ").join("-"))?.scrollIntoView({
    block: "start",
    behavior: "smooth"
  })

  return <List>
    {categories.map((category, index) => {
      return <ListItem key={index}>
        <CategoryButton onClick={scrollIntoView.bind(null, category)}>
          <CategoryButtonText>{category.name_json[language]}</CategoryButtonText>
        </CategoryButton>
      </ListItem>
    })}
  </List>

}

export default MenuPageCategorySidebar
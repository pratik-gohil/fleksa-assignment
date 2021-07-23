import React, { Fragment, FunctionComponent, useState } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategoriesSearch, selectSearchQuery } from "../../../../redux/slices/menu.slices.redux";
import MenuPageProductListItem from "./product-list-item.menu.pages.templateOne.components";

const List = styled.ul`

`

const ListItem = styled.li`
  position: relative;
  z-index: 0;
`

const CategoryImageContainer = styled.div`
  position: sticky;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  margin: 0 -15px;
  height: 200px;
  top: -80px;
  border-top-left-radius: ${props => props.theme.borderRadius}px;
  border-top-right-radius: ${props => props.theme.borderRadius}px;
  overflow: hidden;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin: inherit;
    top: -${props => props.theme.navDesktop.height-20}px;
    border-radius: ${props => props.theme.borderRadius}px;
  }
`

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

const CategoryTitle = styled.h3`
  font-size: 26px;
  text-align: center;
  position: absolute;
  margin: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.01) 100%);
  padding: ${props => props.theme.dimen.X4*3}px 0 ${props => props.theme.dimen.X4}px 0;
  line-height: 1;
  span {
    font-size: 16px;
    font-weight: 400;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    padding: ${props => props.theme.dimen.X4*3}px 0 ${props => props.theme.dimen.X4}px 0;
  }
`

const CategoryTitleSticky = styled.h3`
  font-size: 26px;
  margin: -2px -15px;
  text-align: center;
  position: sticky;
  top: 50px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  padding: ${props => props.theme.dimen.X4}px 0 ${props => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: ${props => props.theme.navDesktop.height}px;
    padding: 0 0 ${props => props.theme.dimen.X4}px;
  }
`

const Space = styled.div`
  width: 100%;
  height: 100px;
`

const MenuPageCategoryList: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const searchQuery = useAppSelector(selectSearchQuery)
  const categories = useAppSelector(state => selectCategoriesSearch(state, searchQuery))

  const [ openItemId, setOpenItemId ] = useState<number|undefined>()

  return <List>
    {categories.map((category, index) => {
      if (category.products.length === 0) return <Fragment key={index} />
      return <Fragment key={index}>
        <Space />
        <ListItem id={category.name_json.english.toLowerCase().replace(/[^A-Za-z0-9]/g,"").split(" ").join("-")}>
          {category.image? <CategoryImageContainer>
            <CategoryImage src={category.image} />
            <CategoryTitle>
              {category.name_json[language]}
              <br />
              <span>{category.description_json[language]}</span>
            </CategoryTitle>
          </CategoryImageContainer>: <CategoryTitleSticky>{category.name_json[language]}</CategoryTitleSticky>}
          <List>
            {category.products.map(product => <MenuPageProductListItem
              key={product.id}
              product={product}
              isOpen={product.id === openItemId}
              setOpenItemId={setOpenItemId}
            />)}
          </List>
        </ListItem>
      </Fragment>
    })}
  </List>
}

export default MenuPageCategoryList
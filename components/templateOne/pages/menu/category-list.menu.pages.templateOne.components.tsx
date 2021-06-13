import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategories } from "../../../../redux/slices/menu.slices.redux";
import MenuPageProductList from "./product-list.menu.pages.templateOne.components";

const List = styled.ul`
  
`

const ListItem = styled.li`

`

const CategoryTitle = styled.h3`

`

const MenuPageCategoryList: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const categories = useAppSelector(selectCategories)

  const [ openItemId, setOpenItemId ] = useState<number|undefined>()

  return <List>
    {categories.map((category, index) => {
      return <ListItem key={index} id={category.name_json.english.toLowerCase().split(" ").join("-")}>
        <CategoryTitle>{category.name_json[language]}</CategoryTitle>
        <MenuPageProductList
          products={category.products}
          openItemId={openItemId}
          setOpenItemId={id => setOpenItemId(id)}
        />
      </ListItem>
    })}
  </List>
}

export default MenuPageCategoryList
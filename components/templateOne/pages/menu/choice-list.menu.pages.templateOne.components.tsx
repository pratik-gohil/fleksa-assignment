import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { ICategoryMultipleProductChoice, ICategorySingleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import { IType } from "../../../../interfaces/common/types.common.interfaces";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectParts } from "../../../../redux/slices/menu.slices.redux";
import MenuPageOptionsList, { IChoiceData } from "./options-list.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  productType: IType
  isOptionOpen: boolean
  choice: ICategorySingleProductChoice|ICategoryMultipleProductChoice
  setSelectedOption(name: string|undefined): void
}

const Wrapper = styled.div`
  border-top: ${props => props.theme.border};
`

const TitleContainer = styled.div`
  cursor: pointer;
`

const ListContainer = styled.div<{ isOptionOpen: boolean }>`
  max-height: ${props => props.isOptionOpen? "260px": "0px"};
  overflow: auto;
  background-color: #f9f9f9;
`

const List = styled.ul`
  border-top: ${props => props.theme.border};
`

const ListItem = styled.li`

`


const MenuPageChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ productType, choice, isOptionOpen, setSelectedOption }) => {
  const language = useAppSelector(selectLanguage)

  if (productType === "MULTIPLE") {
    const tempChoice = choice as ICategoryMultipleProductChoice
    console.log(tempChoice.choice)
    const parts = useAppSelector(state => selectParts(state, tempChoice.choice))
    const choicesMulti: IChoiceData = {
      name_json: tempChoice.name_json,
      options: []
    }
    tempChoice.choice.map(chId => {
      choicesMulti.options?.push({
        name_json: parts[chId].name_json,
        price: parts[chId].price
      })
    })
    return <>
      <MenuPageOptionsList choice={choicesMulti} isOptionOpen={isOptionOpen} setSelectedOption={setSelectedOption} />
      {tempChoice.choice.map(chId => {
        return parts[chId].choice?.map(choice => <MenuPageOptionsList choice={choice} isOptionOpen={isOptionOpen} setSelectedOption={setSelectedOption} />)
      })}
    </>
  } else {
    const tempChoice = choice as ICategorySingleProductChoice
    return <MenuPageOptionsList choice={tempChoice} isOptionOpen={isOptionOpen} setSelectedOption={setSelectedOption} />
  }
}

export default MenuPageChoiceList